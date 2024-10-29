import Attendance from "../models/attendance";
import Employee from "../models/employee";
import Position from "../models/position";
import Role from "../models/role";
import User from "../models/user";
import WorkedHour from "../models/workedhour";
import generatePassword from "../utils/generatePassword";
import { Request, Response } from "express";
import { Op } from "sequelize";
const employeeController: any = {};

employeeController.findAllEmployees = async (req: Request, res: Response) => {
  const findAllEmployees = await Employee.findAll({
    where: {
      isActive: true,
    },
    include: [{ model: Position }],
  });

  res.status(200).send({ data: findAllEmployees });
};

employeeController.findOneEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isNaN(parseInt(id))) {
    return res
      .status(400)
      .send({ message: "Couldn't find the employee, the ID sent is not a number" });
  }

  const findOneUser = await User.findOne({
    where: {
      username: req.user.username,
    },
    include: [{ model: Employee, required: false }],
  });

  if (!findOneUser) {
    return res
      .status(404)
      .send({ message: "Couldn't find the user of the current employee" });
  }

  const include: any = [
    {
      model: Position,
      required: false,
    },
  ];

  const findOneRole = await Role.findOne({
    where: { name: "IT Admin" },
  });

  if ((findOneRole && (findOneUser.roleId === req.user.roleId)) || (findOneUser.employee && findOneUser.employee.id == id)) {
    include.push({
      model: User,
    }); 
    include.push({
      model: Attendance,
    })
  }
  
  const findOneEmployee = await Employee.findOne({
    where: {
      id,
      isActive: true,
    },
    include,
  });

  if (!findOneEmployee) {
    return res.status(404).send({ message: "Couldn't find this employee" });
  }

  return res.status(200).send({ data: findOneEmployee });
};

employeeController.findEmployeeWorkedHours = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const { startDate, endDate } = req.query;

  let where: any = {};

  where.id = id;

  where.isActive = true;

  if (startDate && endDate) {
    where.creationDate = {
      [Op.between]: [
        new Date(startDate + " 00:00:00"),
        new Date(endDate + " 23:59:59"),
      ],
    };
  }

  const findOneEmployee = await Employee.findOne({
    where,
    include: [
      {
        model: WorkedHour,
        required: false,
      },
    ],
  });

  if (!findOneEmployee) {
    return res.status(404).send({ message: "Couldn't find this employee" });
  }

  const initialValue = 0;

  const findOneEmployeeWorkedHours = findOneEmployee.workedhours.reduce(
    (partialSum, workedHour) => partialSum + workedHour.hours,
    initialValue
  );

  const data = {
    ...findOneEmployee.dataValues,
    totalWorkedHours: findOneEmployeeWorkedHours,
  };

  return res.status(200).send({ data });
};

employeeController.findEmployeeSalary = async (req: Request, res: Response) => {

  res.status(200).send({});
};

employeeController.createEmployee = async (req: Request, res: Response) => {
  const { firstName, lastName, identityNumber } = req.body;

  if (!firstName || !lastName || !identityNumber) {
    return res
      .status(400)
      .send({
        message: "Couldn't add the employee, all the fields are required",
      });
  }

  const findOneEmployee = await Employee.findOne({
    where: {
      identityNumber,
    },
  });

  if (findOneEmployee) {
    if (!findOneEmployee.isActive) {
      return res
        .status(409)
        .send({
          message:
            "Couldn't add the employee, an employee with this identity number already exists is the database",
        });
    }
    return res
      .status(409)
      .send({
        message: "Couldn't add the employee, this employee already exists",
      });
  }

  const partialUsername = `${firstName[0].toLowerCase()}${lastName
    .split(" ")[0]
    .toLowerCase()}`;

  const findOneUser = await User.findOne({
    where: {
      username: { [Op.like]: `${partialUsername}%` },
    },
    order: [["createdAt", "DESC"]],
  });

  let username = "";

  if (findOneUser) {
    const findOneUserUsername = findOneUser.username;

    const usernameIndexNumber = parseInt(
      findOneUserUsername[findOneUserUsername.length - 1]
    );

    username = partialUsername + (usernameIndexNumber + 1);
  } else {
    username = partialUsername + 1;
  }

  const password = generatePassword();

  const findRole = await Role.findOne({
    where: {
      name: "User",
    },
  });

  if (!findRole) {
    return res
      .status(404)
      .send({ message: "Could't find the User role to give to this employee" });
  }

  const createUser = await User.create({
    username,
    password,
    isBoolean: true,
    roleId: findRole.id,
  });

  const createEmployee = await Employee.create({
    firstName,
    lastName,
    identityNumber,
    userId: createUser.id,
    isActive: true,
  });

  createEmployee.dataValues.user = createUser.dataValues;

  console.log(createEmployee)

  return res.status(201).send({ data: createEmployee });
};

employeeController.addEmployeeWorkedHours = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const { hours } = req.body;

  const findOneEmployee = await Employee.findOne({
    where: {
      id,
      isActive: true,
    },
  });

  if (!findOneEmployee) {
    return res.status(404).send({ message: "Couldn't find this employee" });
  }

  await WorkedHour.create({
    hours,
    employeeId: findOneEmployee.id,
    creationDate: new Date(),
  });

  return res
    .status(201)
    .send({ message: "The worked hours for this employee were added" });
};

employeeController.updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .send({
        message:
          "Couldn't add the employee, the name, lastname are all required",
      });
  }

  const findOneEmployee = await Employee.findOne({
    where: {
      id,
      isActive: true,
    },
  });

  if (!findOneEmployee) {
    return res.status(404).send({ message: "Couldn't find this employee" });
  }

  findOneEmployee.firstName = firstName;
  findOneEmployee.lastName = lastName;

  await findOneEmployee.save();

  return res.status(201).send({ data: findOneEmployee });
};

employeeController.deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;

  const findOneEmployee = await Employee.findOne({
    where: {
      id,
    },
  });

  if (!findOneEmployee) {
    return res.status(404).send({ message: "Couldn't find this employee" });
  }

  findOneEmployee.isActive = false;

  await findOneEmployee.save();

  return res.status(201).send({ data: "The employee has been deleted" });
};

export default employeeController;

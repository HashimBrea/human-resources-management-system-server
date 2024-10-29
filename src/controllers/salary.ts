import { Request, Response } from 'express';
import Salary from '../models/salary';
import Position from '../models/position';

const salaryController: any = {};

salaryController.findAllSalaries = async (req: Request, res: Response) => {
  try {
    const findAllSalaries = await Salary.findAll({});
    res.status(200).send({ data: findAllSalaries });
  } catch (error) {
    res.status(500).send({ message: "Couldn't retrieve the salaries", error });
  }
};

salaryController.findOneSalary = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Couldn't find the salary, the ID sent is not a number" });
  }

  try {
    const findOneSalary = await Salary.findOne({
      where: {
        id,
      },
    });

    if (!findOneSalary) {
      return res.status(404).send({ message: "Couldn't find this salary" });
    }

    res.status(200).send({ data: findOneSalary });
  } catch (error) {
    res.status(500).send({ message: "Couldn't retrieve the salary", error });
  }
};

salaryController.createSalary = async (req: Request, res: Response) => {
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return res.status(400).send({ message: "Couldn't add the salary, the quantity is required" });
  }

  try {
    const createSalary = await Salary.create({
      quantity,
    });

    res.status(201).send({ data: createSalary });
  } catch (error) {
    res.status(500).send({ message: "Couldn't add the salary", error });
  }
};

salaryController.updateSalary = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return res.status(400).send({ message: "Couldn't update the salary, quantity is required" });
  }

  try {
    const salary = await Salary.findOne({
      where: {
        id,
      },
    });

    if (!salary) {
      return res.status(404).send({ message: "Couldn't find this salary" });
    }

    salary.quantity = quantity;
    await salary.save();

    res.status(200).send({ data: salary });
  } catch (error) {
    res.status(500).send({ message: "Couldn't update the salary", error });
  }
};

salaryController.deleteSalary = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const findOneSalary = await Salary.findOne({
      where: {
        id,
      },
      include: [
        {
            model: Position,
            required: false
        }
      ]
    });

    if (!findOneSalary) {
      return res.status(404).send({ message: "Couldn't find this salary" });
    }

    const deleteOneSalary = await Salary.destroy({
        where: {
            id
        }
    });

    res.status(200).send({ data: "The salary has been deleted" });
  } catch (error) {
    res.status(500).send({ message: "Couldn't delete the salary", error });
  }
};

export default salaryController;

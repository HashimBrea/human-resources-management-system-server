import Employee from "../models/employee";
import Position from "../models/position";
import Role from "../models/role";
import User from "../models/user";
import Permission from "../models/permission";
import { Request, Response } from "express";
const userController: any = {};

userController.findOneUser = async (req: Request, res: Response) => {
  const findOneUser = await User.findOne({
    where: {
      username: req.user.username,
    },
    include: [
      {
        model: Role,
        required: false,
        include: [
          {
            model: Permission
          }
        ]
      },
      {
        model: Employee,
        required: false,
        include: [
          {
            model: Position,
            required: false,
          },
        ],
      },
    ],
  });

  if (!findOneUser) {
    return res
      .status(404)
      .send({ message: "Couldn't find this user" });
  }

  return res.status(200).send({ data: findOneUser });
};

export default userController;

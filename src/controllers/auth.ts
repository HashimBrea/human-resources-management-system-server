import User from "../models/user";
import Role from "../models/role";
import Employee from "../models/employee";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Position from "../models/position";
const authController: any = {};

authController.login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Couldn't log in, both the username and password are required"});
    }
  
    const findOneUser = await User.findOne({
      where: {
        username,
      },
      include: [
        {
          model: Role,
      },
      {
        model: Employee,
        required: false,
        include: [ {
          model: Position
        }
        ]
    },
      ]
    });

    if (!findOneUser) {
        return res.status(404).send({ message: "Couldn't find this user" });
    }
  
    if (findOneUser.password !== password) {
        return res.status(401).send({ message: "Couldn't log in, incorrect password for this user" });
    }

    //const token = jwt.sign({ username, roleName: findOneUser.role.name, employee: findOneUser.employee ? findOneUser.employee.position.name : null}, "secret");

    const token = jwt.sign({ username }, "secret");

    res.cookie('authcookie', token ,{ httpOnly:true,});
  
    res.status(200).send({
      message: "Login successful"
    });
};

export default authController;

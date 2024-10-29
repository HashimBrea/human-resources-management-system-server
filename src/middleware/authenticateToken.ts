import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Role from "../models/role";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies["authcookie"];
  
  if (authCookie == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(authCookie, "secret", async (err: any, decoded: any) => {
    if (err) {
      res.sendStatus(401);
      return;
    }

    try {
      const findOneUser = await User.findOne({
        where: { username: decoded.username },
      });

      if (!findOneUser) {
        res.sendStatus(401);
        return;
      }

      const findOneRole = await Role.findOne({
        where: { id: findOneUser.roleId },
      });

      if (!findOneRole) {
        res.sendStatus(401);
        return;
      }

      const userProperties = {
        username: findOneUser.username,
        roleId: findOneUser.roleId,
      };

      req.user = userProperties;
      next();
    } catch (error) {
      res.sendStatus(401);
    }
  });
}

export default authenticateToken;

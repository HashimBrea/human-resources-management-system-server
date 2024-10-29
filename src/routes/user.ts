import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

import userController from "../controllers/user";

const { findOneUser } = userController;

router.route('/').get(authenticateToken, findOneUser);

export default router;
import { Router } from "express";
//import authenticateToken from "../middleware/authenticateToken";

const router = Router();

import authController from "../controllers/auth";

const { login } = authController;

router.route('/login').post(login);

export default router;
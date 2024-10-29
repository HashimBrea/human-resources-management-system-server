import { Router } from "express";
import employeeRoutes from "./employee";
import authRoutes from "./auth";
import userRoutes from "./user";
import salaryRoutes from "./salary";

const router = Router();

//Employees

router.use('/employee', employeeRoutes);

//Auth

router.use('/auth', authRoutes);

//User

router.use('/user', userRoutes);

//Salary

router.use('/salary', salaryRoutes);

export default router;
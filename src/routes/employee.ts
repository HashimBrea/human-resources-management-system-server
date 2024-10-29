import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

import employeeController from "../controllers/employee";

const { findAllEmployees, findOneEmployee, findEmployeeWorkedHours, findEmployeeSalary, createEmployee, addEmployeeWorkedHours, updateEmployee, deleteEmployee } = employeeController;

router.route('/').get(authenticateToken, findAllEmployees);

router.route('/:id').get(authenticateToken, findOneEmployee); 

router.route('/:id/hours').get(authenticateToken, findEmployeeWorkedHours);

router.route('/:id/salary').get(authenticateToken, findEmployeeSalary);

router.route('/').post(authenticateToken, createEmployee);

router.route('/:id/hours').post(authenticateToken, addEmployeeWorkedHours);

router.route('/:id').put(authenticateToken, updateEmployee);

router.route('/:id').patch(authenticateToken, deleteEmployee);


export default router;
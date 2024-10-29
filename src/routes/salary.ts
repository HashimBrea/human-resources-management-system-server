import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

import salaryController from "../controllers/salary"; 
const { 
  findAllSalaries, 
  findOneSalary, 
  createSalary, 
  updateSalary, 
  deleteSalary 
} = salaryController;

router.route('/').get(authenticateToken, findAllSalaries);

router.route('/:id').get(authenticateToken, findOneSalary);

router.route('/').post(authenticateToken, createSalary);

router.route('/:id').put(authenticateToken, updateSalary);

router.route('/:id').delete(authenticateToken, deleteSalary);

export default router;

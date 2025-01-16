import express from 'express';
import { authenticate, authorized } from '../middleware/authmiddleware.js';
import { createStudent,getAllStudents,getSpecificStudent,updateStudent,deleteStudent } from '../controllers/student.js';


const router=express.Router();

router.post('/', createStudent);
router.get('/',getAllStudents);
router.get('/:id',getSpecificStudent);
router.put('/:id',updateStudent);
router.delete('/:id',deleteStudent);


export default router;
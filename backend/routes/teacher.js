import express from 'express';
import { createTeacher, getAllTeachers, getSpecificTeacher ,updateTeacher,deleteTeacher} from '../controllers/teacher.js';


const router=express.Router();

router.post('/',createTeacher);
router.get('/',getAllTeachers);
router.get('/:id',getSpecificTeacher);
router.put('/:id',updateTeacher);
router.delete('/:id',deleteTeacher);

export default router;
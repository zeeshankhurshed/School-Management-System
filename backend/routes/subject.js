import express from 'express';
import { createSubject ,getAllSubjects,getSpecificSubject,updateSubject,deleteSubject} from '../controllers/subject.js';

const router=express.Router();

router.post('/',createSubject);
router.get('/',getAllSubjects);
router.get('/:id',getSpecificSubject);
router.put('/:id',updateSubject);
router.delete('/:id',deleteSubject);

export default router;
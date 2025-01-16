import express from 'express';
import { createResult,getAllResults,getStudentResult,updateResult, deleteResult} from '../controllers/result.js';

const router=express.Router();

router.post('/',createResult);
router.get('/',getAllResults);
router.get('/:studentId', getStudentResult);
router.put('/:studentId',updateResult);
router.delete('/:studentId',deleteResult);

export default router;
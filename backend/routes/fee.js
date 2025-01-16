import express from 'express';
import { createFee, getAllFees, getSpecificStudentFee,updateFee,deleteFee } from '../controllers/fee.js';


const router=express.Router();

router.post('/',createFee);
router.get('/',getAllFees);
router.get('/:id',getSpecificStudentFee);
router.put('/:id',updateFee);
router.delete('/:id',deleteFee);


export default router;
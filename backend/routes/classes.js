import express from 'express';
import { authenticate, authorized } from '../middleware/authmiddleware.js';
import { createClass,updateClass,removeClass,getAllClasses,specificClasses } from '../controllers/classes.js';


const router=express.Router()

router.post('/',authenticate,authorized,createClass);
router.put('/:id',authenticate,authorized,updateClass);
router.delete('/:id',authenticate,authorized,removeClass);
router.get('/',getAllClasses);
router.get('/:id',specificClasses);

export default router;

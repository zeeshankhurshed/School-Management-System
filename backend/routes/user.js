import express from 'express';
import { authenticate, authorized } from '../middleware/authmiddleware.js';
import { createUser,loginUser,logoutUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,getSpecificUser,deleteUser } from '../controllers/user.js';

const router=express.Router();

router.post('/',createUser);
router.post('/auth', loginUser);
router.post('/logout',logoutUser);
router.get('/',getAllUsers);
router.get('/:id',authenticate,authorized,getSpecificUser);
router.get('/profile',authenticate,getCurrentUserProfile);
router.put('/profile',authenticate,updateCurrentUserProfile);
router.delete('/:id',authenticate,authorized,deleteUser);

export default router;
import express from 'express';
import {homepage, updateUser, getAllUsers,deleUser, registerUser } from '../controllers/controllers.js'
const router = express.Router();

router.get('/', homepage);

router.post('/register', registerUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:user', deleUser);

router.get('/all-users', getAllUsers);

export default router;
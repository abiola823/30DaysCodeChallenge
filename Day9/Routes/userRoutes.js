import express from 'express';
import userModel from '../Model/model.js';
import {homepage, updateUser, getAllUsers,deleUser, addUser} from '../controllers/controllers.js'
const router = express.Router();

router.get('/', homepage);

router.post('/post', addUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:user', deleUser);

router.get('/all-users', getAllUsers);

export default router;
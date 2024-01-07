import express, { application } from 'express';
import { adminsOnly, isUserLoggedIn } from "../middlware/middleware.js";
import {
    homepage,
    updateUser,
    getAllUsers,
    deleUser,
    registerUser, 
    loginUser,
} from '../controllers/controllers.js'


const router = express.Router();

router.get('/', homepage);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.use(isUserLoggedIn);

router.put('/update/:id', updateUser);


router.delete('/delete/:user', deleUser);

router.get('/all-users', adminsOnly, getAllUsers);



export default router;
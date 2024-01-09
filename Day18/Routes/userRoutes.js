import express, { application } from 'express';
import { adminsOnly, isUserLoggedIn } from "../middlware/middleware.js";
import {
    homepage,
    updateUser,
    getAllUsers,
    deleUser,
    registerUser, 
    loginUser,
    getNewToken,
    logout
} from '../controllers/controllers.js'
import { generateFreshToken } from '../utils/generatetoken.js';
import cookieParser from 'cookie-parser';


const router = express.Router();

router.use(cookieParser());

router.get('/', homepage);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/refresh_token', generateFreshToken, getNewToken);

router.post('/logout', logout);

router.use(isUserLoggedIn);

router.put('/update/:id', updateUser);


router.delete('/delete/:user', deleUser);

router.get('/all-users', adminsOnly, getAllUsers);



export default router;
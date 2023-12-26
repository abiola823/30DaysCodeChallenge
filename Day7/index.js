import express from 'express';
import request from './middleware/middleware.js';
const app = express();
import * as dotenv from 'dotenv';
import db from './config/db.js';
import router from './Routes/userRoutes.js';
dotenv.config()
const PORT = process.env.PORT;
const userRoute = router;
// create a connection to mongodb
db();
app.use(express.json());
app.use(request);// custom middleware to log the date to the console







app.use('/user', userRoute)

// Creating a server using express the expressjs framework
app.listen(PORT, () => console.log(`server running on port ${PORT}`));



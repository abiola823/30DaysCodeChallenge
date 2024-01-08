import express, { urlencoded } from 'express';
import {request} from './middlware/middleware.js';
const app = express();
import * as dotenv from 'dotenv';
import db from './config/db.js';
import router from './Routes/userRoutes.js';
import { notFound, errorHandler } from './middlware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer';
import uploadSchema from './Model/uploads.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import uploadCollection from './Model/uploads.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const userRoute = router;
app.use( express.static(path.join(__dirname,'public')));
dotenv.config()
const PORT = process.env.PORT;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  const upload = multer({ storage: storage });

    // Route to handle file upload
  app.post('/upload', upload.single('pictureName'), async(req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
          await uploadCollection.create({
            pictureName: req.file.originalname,
            path: req.file.destination

          });
          res.send('uploaded successfully')
  });

// create a connection to mongodb
db();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(request);// custom middleware to log the date to the console
app.use(cookieParser());

app.use('/user', userRoute);

app.use(notFound);
app.use(errorHandler);









// Creating a server using express the expressjs framework
app.listen(PORT, () => console.log(`server running on port ${PORT}`));



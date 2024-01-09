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
import {Server} from 'socket.io'; 
import { dirname } from 'path';
import {createServer} from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);
import { fileURLToPath } from 'url';
import uploadCollection from './Model/uploads.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const userRoute = router;

app.use( express.static(path.join(__dirname,'public')));

dotenv.config()

const PORT = process.env.PORT || 3000;

// create a connection to mongodb
db();
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

  io.on("connection", (socket) => {
    console.log(socket.id);
  
    socket.on("send-message", (payload, callback) => {
      console.log(payload);
  
      socket.to(payload.sendTo).emit("new-message", {
        message: payload.message
      });
  
      callback({
        successful: true,
        message: "Your message has been sent"
      });
    });
  
  });
  


app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(request);// custom middleware to log the date to the console
app.use(cookieParser());

app.use('/user', userRoute);

app.use(notFound);
app.use(errorHandler);









// Creating a server using express the expressjs framework
httpServer.listen(PORT, function() {
  console.log("REST and socket.io listening on port", PORT);
});



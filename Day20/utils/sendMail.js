import nodemailer  from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const options = {
    service: process.env.SERVICE,
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASSWORD
    }
}; 


const send = nodemailer.createTransport(options);

export {
    send
};
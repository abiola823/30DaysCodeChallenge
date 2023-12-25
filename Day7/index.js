import express from 'express';
import request from './middleware.js';
const app = express();
import userModel from './Model/model.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT;
// create a connection to mongodb
mongoose.connect(process.env.MONGODBURL);
app.use(express.json());
app.use(request);// custom middleware to log the date to the console


let person = [
    {
        id: 1,
        name: "abiola",
        age: 25
    },
    {
        id: 2,
        name: "james",
        age: 23
    },
    {
        id: 3,
        name: "joseph",
        age: 27
    },
    {
        id: 4,
        name: "ade",
        age: 21
    }
];


app.get('/', (req, res) => {
    res.send("Welcome to the 30 days of the code challenge");
});

app.post('/post', (req, res) => {
    try {
        const {id, name, age} = req.body;//object destructuring
        const personObj = {
            id, 
            name,
            age
        };
        const personArr = person.push(personObj);
        return res.status(201).json({userDetails: person})
    } catch (error) {
        console.log(error);
    }
   
});

app.put('/update/:id', (req, res) => {
    try {
        person.map((one) => {
            if(one.id === parseInt(req.params.id)) {
                one.id = req.body.id;
                one.name = req.body.name;
                one.age = req.body.age;
                return res.json({updatedUser: person});
            }else{
                return res.send("no user found"); 
            }
          
        })
    } catch (error) {
        console.log(error);
    }
});



app.delete('/delete/:user', (req, res)=>{
    const id = req.params.user
    const newUsers = person.filter((user, index) => user.name != id)
    console.log(newUsers)
    person = newUsers;
    res.status(200).json({
        message: 'deleted user',
        data: person
    });

});

app.get('/all-users', (req,res) => {
    res.json({allUsers: person})
});


// Creating a server using express the expressjs framework
app.listen(PORT, () => console.log(`server running on port ${PORT}`));



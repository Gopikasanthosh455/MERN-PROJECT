const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["GET","POST"],
    credentials: true
})) 
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb+srv://gopikaps7066:0Yh5R19AOVsT1v6m@cluster0.aotvb.mongodb.net/Employee')

app.post("/login", (req,res)=>{
    const {email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>{
    
        if(user){
            bcrypt.compare(password,user.password,(err,response) =>{
                if (response){
                    const token = jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"id"})
                    res.cookie("token",token);
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")

                }
            })
        } else{
            res.json("No record existed")
        }

    })
})


app.post('/register', (req, res) => {
    const {name, email , password} = req.body;
    bcrypt.hash(password,10)
    .then(hash => {
        EmployeeModel.create({name, email,password:hash})
        .then(employee => res.json(employee))
        .catch(err => res.json(err))

    }).catch(err => console.log(err.message))
    
})


app.listen(3001,() =>{
    console.log("Server is Running")
})
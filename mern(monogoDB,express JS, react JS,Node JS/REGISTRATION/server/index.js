const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://gopikaps7066:0Yh5R19AOVsT1v6m@cluster0.aotvb.mongodb.net/Register')

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json("Already have an account"); // Return after sending response
            } else {
                return RegisterModel.create({ name: name, email: email, password: password })
                    .then(result => res.status(201).json("Account created")) // Return after sending response
                    .catch(err => res.status(500).json(err)); // Catch errors in creation
            }
        })
        .catch(err => res.status(500).json(err)); // Catch errors in findOne
});


app.listen(3001,() =>{
    console.log("Server is Running")
})
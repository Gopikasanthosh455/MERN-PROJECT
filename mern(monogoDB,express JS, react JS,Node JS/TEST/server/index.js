const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://gopikaps7066:0Yh5R19AOVsT1v6m@cluster0.aotvb.mongodb.net/test')

app.get('/getUsers',(req,res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})
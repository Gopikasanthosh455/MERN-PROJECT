const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel =require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://gopikaps7066:0Yh5R19AOVsT1v6m@cluster0.aotvb.mongodb.net/SampleUser?retryWrites=true&w=majority&appName=Cluster0"
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get("/getUsers",(req,res) =>{
    UserModel.find({}).then(function(users){
         res.json(users)
    }).catch(function(err) {
        res.json(err)
    })

})


app.post("/createUsers", async (req, res) => {
    try {
        console.log(req.body)
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the user." });
    }
});


app.listen(30012, ()=>{
    console.log("Server is running")
})
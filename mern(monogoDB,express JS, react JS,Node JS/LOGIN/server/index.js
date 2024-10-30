const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://gopikaps7066:0Yh5R19AOVsT1v6m@cluster0.aotvb.mongodb.net/Login')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model("user", UserSchema);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(404).json("No record exists");
        }

        if (user.password === password) {
            return res.json("Login Successfully");
        } else {
            return res.status(401).json("The password is incorrect");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json("Internal server error");
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

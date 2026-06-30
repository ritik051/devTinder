const validator = require("validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const express =  require('express');
const connectDb = require('./config/database');
const User =  require('./models/user');
const { validateSignupData } = require('./utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req,res) => {
    
    try {
        validateSignupData(req);
        const {password} = req.body;
        const hashedpassword =  await bcrypt.hash(password, 10);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedpassword
        });
        await user.save();
        res.send("User created successfully");
    }
    catch (err) {
        res.status(500).send("Error creating user" + err.message);
    }
        
});

app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        //generate token
        const token = jwt.sign({_id: user._id}, "DevTinder@123", {expiresIn: "7d"});
        res.cookie("token", token, {
            expires: new Date(Date.now() + 168 * 3600000), // cookie will be removed after 7 days
        });
        console.log(res.getHeaders());
        res.send("Login successful");
    }
    catch(err) {
        res.status(500).send("something went wrong" + err.message);
    }
});

app.get('/profile', auth, async (req,res) => {
    try{
        const user = req.user;
        if(!user) {
            throw new Error("User not found");
        }
        res.send(user);
    }
    catch(err) {
        res.status(500).send("something went wrong"+ err.message);
    }
});

app.post('/sendConnectionRequest', auth, async (req,res) => {
    const user = req.user;
    res.send(user.firstName+" sent the connection request");
})


connectDb().then(() => {
    console.log("Database connected successfully");
    app.listen(9999, () => {
        console.log("Server is running on port 9999");
    })
}).catch((err) => {
    console.error("Database connection failed", err);
});

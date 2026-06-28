require("dotenv").config();

const express =  require('express');
const connectDb = require('./config/database');
const User =  require('./models/user');
const app = express();

app.use(express.json());

app.post('/signup', async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully");
    }
    catch (err) {
        res.status(500).send("Error creating user");
    }
        
});

app.get('/users', async (req,res) => {
    try{
        // const users = await User.find({email: req.body.email});
        // if(users.length === 0) {
        //     return res.status(404).send("No users found");
        // }
        const users = await User.findOne({email: req.body.email});
         if(!users) {
            return res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err) {
        res.status(500).send("something went wrong")
    }
});

app.get('/feed', async (req,res) => {
    try{
        const users = await User.find({});
        if(users.length === 0) {
            return res.status(404).send("No users found");
        }else{
            res.send(users);
        }
    }
    catch(err) {
        res.status(500).send("something went wrong")
    }
});

connectDb().then(() => {
    console.log("Database connected successfully");
    app.listen(9999, () => {
        console.log("Server is running on port 9999");
    })
}).catch((err) => {
    console.error("Database connection failed", err);
});

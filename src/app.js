const express =  require('express');
const connectDb = require('../config/database');
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
        
})

connectDb().then(() => {
    console.log("Database connected successfully");
    app.listen(9999, () => {
        console.log("Server is running on port 9999");
    })
}).catch((err) => {
    console.error("Database connection failed", err);
});

const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if(!token) {
            throw new Error(" Invalid Token");
        }
        const decodeData = jwt.verify(token,"DevTinder@123");
        const { _id } = decodeData;
        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch(err) {
        res.status(400).send("Somethinf went wrong: "+ err.message);
    }
}

module.exports = {auth};
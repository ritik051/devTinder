const mongoose = require("mongoose");

const connectDB =  async () => {
    await mongoose.connect("mongodb+srv://strangerforall3_db_user:NSh5MB7TMxQK2slY@courage.3o8mv5j.mongodb.net/devTinder");
}

module.exports = connectDB;
const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = {};

    if (!firstName || !lastName) {
        throw new Error("First and last names are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Strong password is required");
    }

};

module.exports = {
    validateSignupData
}
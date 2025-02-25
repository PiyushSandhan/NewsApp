const express = require('express');

const router = express.Router();

// Regex patterns
const usernamePattern = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
const phonePattern = /^\+?[1-9]\d{1,14}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const validateRegistration = (req, res, next) => {
    const { username, phoneNumber, password } = req.body;
    const errors = [];

    // Validate username
    if (!usernamePattern.test(username)) {
        errors.push("Username should be alphanumeric, start with a letter, and at least 3 characters long.");
    }

    // Validate phone number
    if (!phonePattern.test(phoneNumber)) {
        errors.push("Phone number should match international E.164 format.");
    }

    // Validate password
    if (!passwordPattern.test(password)) {
        errors.push("Password must be 6-20 characters long, including at least one upper case letter, one lower case letter, and one numeric digit.");
    }

    // If there are any errors, return them
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors
        });
    }

    next();
};


const UserController = require('../controllers/user.controller');


router.post('/register', validateRegistration, UserController.register);

module.exports = router;
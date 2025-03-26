import express from 'express';

const router = express.Router();

import { usernamePattern, phonePattern, passwordPattern } from '../utils/regxPatterns.js';
import { errorHandler } from '../utils/errorHandler.js';

export const validateRegistration = (req, res, next) => {
    const { username, phoneNumber, password } = req.body;
    const errors = [];

    if (!usernamePattern.test(username)) {
        errors.push("Username should be alphanumeric, start with a letter, and at least 3 characters long.");
    }

    if (!phonePattern.test(phoneNumber)) {
        errors.push("Phone number should match international E.164 format.");
    }

    if (!passwordPattern.test(password)) {
        errors.push("Password must be 6-20 characters long, including at least one upper case letter, one lower case letter, and one numeric digit.");
    }

    if (errors.length > 0) {
        return errorHandler(res, 400, "Validation errors", errors);
    }

    next();
};

export default router;
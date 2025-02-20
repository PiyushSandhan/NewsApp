const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken');

const UserController = {
    async register(req, res) {
        try {
            const { username, phoneNumber, password } = req.body;
            if (!username || !phoneNumber || !password) {
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ phoneNumber });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this phone number' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create a new user
            const newUser = new User({
                username,
                phoneNumber,
                password: hashedPassword
            });

            await newUser.save();
            
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },

    async login(req, res) {
        const { phoneNumber, password } = req.body;

 

    try {
        const user = await User.findOne({ phoneNumber });
       
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        const token=jwt.sign(
            {username: user.username },
            'PIYUSH',
            { expiresIn: '1h' }
        )

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }

    }
};

module.exports = UserController;
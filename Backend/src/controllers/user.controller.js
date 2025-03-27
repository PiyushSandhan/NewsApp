import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { validateFields } from '../utils/validateFields.js'; 
import { errorHandler } from '../utils/errorHandler.js'; 
import mongoose from 'mongoose';  // <-- Add this line

const UserController = {
    async register(req, res) {
        try {
            const { username, phoneNumber, password } = req.body;
            if (!validateFields({ username, phoneNumber, password })) {
                return errorHandler(res, 400, 'Please enter all fields');
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
            
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: { id: newUser._id, username: newUser.username }
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },

    async login(req, res) {
        const { phoneNumber, password } = req.body;

 

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' ,error: err.message });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid phone number or password',error: err.message  });
        }
        const token=jwt.sign(
            {id:user._id,username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '0.1hr' }
        )
        res.json({ message: 'Login successful', token,id:user._id});
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }

    },
    async getUserProfile(req, res) {
        
    
        try {
            // Ensure ID is converted to ObjectId
            const user = await User.findById(new mongoose.Types.ObjectId(req.params.id)).select('-password');
    
            if (!user) {
                console.log('❌ User not found');
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json(user);
        } catch (err) {
            console.error('❌ Error in getUserProfile:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-password'); // Excluding passwords for security
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },    
    
    async updateProfile(req, res) {
        try {
            const { username, phoneNumber, password } = req.body;
            if (!validateFields({ username, phoneNumber })) {
                return errorHandler(res, 400, 'Please enter all fields');
            }
       
            const userId = req.headers['id']; 

if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
}

const user = await User.findById(userId);
            if (!user) {
                return errorHandler(res, 404, 'User not found');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            user.username = username;
            user.phoneNumber = phoneNumber;
            user.password = hashedPassword;

            await user.save();
            
            res.json({
                success: true,
                message: 'Profile updated successfully',
                user: { id: user._id, username: user.username }
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    },

};

export default UserController;
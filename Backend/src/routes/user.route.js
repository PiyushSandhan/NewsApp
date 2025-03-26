// Initialize express router
import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js';
import { validateRegistration } from '../middleware/authMiddleware.js';

router.post('/register', validateRegistration, UserController.register);
router.post('/login', UserController.login);

export default router;
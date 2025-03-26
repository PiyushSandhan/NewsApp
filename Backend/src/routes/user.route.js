// Initialize express router
import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js';


router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;
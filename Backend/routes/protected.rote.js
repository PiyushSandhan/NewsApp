// routes/protected.route.js
const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route!', user: req.user });
});

module.exports = router;

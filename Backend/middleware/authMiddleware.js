// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token.split(' ')[1], 'PIYUSH');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//     }
// };

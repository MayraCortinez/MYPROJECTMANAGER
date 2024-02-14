const express = require('express');
const router = express.Router();

const { register, verifyToken, login, changePassword, checked, sendToken } = require('../controllers/authController')

/* /api/auth */

router
    .post('/register', register )
    .post('/login', login )
    .get('/checked/:token', checked )
    .post('/send-token', sendToken )
        .get('/reset-password/:token', verifyToken)
        .post('/reset-password', changePassword)

module.exports = router;
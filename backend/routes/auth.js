const express = require('express');
const router = express.Router();

const { register, verifyToken, login, changePassword, checked, sendToken } = require('../controllers/authController')
  

/*api/auth */

router
    .post('/register', register )
    .post('/login', login )
    .get('/checked/:token', checked )
    .post('/send-token', sendToken )
    .route('/recover-password')
        .get(verifyToken)
        .post(changePassword)


module.exports = router;

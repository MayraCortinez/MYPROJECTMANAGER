const express = require('express');
const router = express.Router();

const { register, verifyToken, login, changePassword, checked, sendToken } = require('../controllers/authController')

/* /api/auth */

router
    .post('/register', register )
    .post('/login', login )
    .get('/checked', checked )
    .post('/send-token', sendToken )
    .route('/reset-password')
        .get(verifyToken)
        .post(changePassword)

    router.get('/', (req, res) => {
            res.send('Bienvenido a la API del proyecto manager'); // Puedes personalizar este mensaje
    });

module.exports = router;

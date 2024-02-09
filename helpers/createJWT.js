const jwt = require('jsonwebtoken');


module.exports = (payload) => jwt.sign(payload, process.env.JWT, {
    expiresIn : '1h'
})
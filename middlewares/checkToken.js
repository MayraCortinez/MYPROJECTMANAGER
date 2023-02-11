const errorResponse = require('../helpers/errorResponse');
const {verify} = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../database/models/User');

module.exports = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization){
            throw createHttpError(401, 'Se requiere token');
        }

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JWT);

        req.user = await User.findById(decoded.id).select('name'); 

        next()

    } catch (error) {
        console.error(error)


      /*   switch(error.message){
            case 'jwt expired':
                error.status = 403,
                msg = 'El token ha expirado'
                break;
            case 'invalid signature' :
                error.staus = 403,
                msg = 'Token inválido'
                break;
            default : 
                msg = error.message
            break;
        }
 */
        return errorResponse(res, error, 'CheckToken');
    }
}
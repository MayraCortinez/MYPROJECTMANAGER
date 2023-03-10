const createError = require('http-errors');
const User = require('../database/models/User');
const createJWT = require('../helpers/createJWT');
const createToken = require('../helpers/createToken');
const errorResponse = require('../helpers/errorResponse');
const { confirmRegister, forgetPassword } = require('../helpers/sendEmails');



module.exports = {
    register : async (req, res) => {
        try {

            const { name, email, password } = req.body;

            if([name,email,password].includes(' ')){
                throw createError(400, 'No deben quedar campos vacíos')
            }

            let user = await User.findOne({
                email
            });

            let userName = await User.findOne({
                name
            });

            if(userName){
                throw createError(400, 'El nombre de usuario ya se encuentra registrado');
            }
            if(user){
                throw createError(400, 'El email ya se encuentra registrado');
            }

            const token = createToken();
            user = new User(req.body);
            user.token = token;

            const userStore = await user.save();

            confirmRegister ({
                name : userStore.name,
                email : userStore.email,
                token : userStore.token
            })

            console.log(userStore);

            return res.status(201).json({
                ok: true,
                msg : 'Se te ha enviado un email para que completes tu registro',
                user : userStore
            })

        } catch (error) {
            errorResponse(res, error, 'Register')
        }
    },
    
    login : async (req, res) => {

        const { email, password } = req.body;


        try {

            if([ email, password].includes('')){
                throw createError(400, 'No deben quedar campos vacíos')
            }

            let user = await User.findOne({
                email
            });

            if(!user){
                throw createError(403, 'Datos incorrectos');
            }

            if(!user.checked){
                throw createError(403, 'La cuenta no ha sido confirmada');
            } 

            if(!await user.checkedPassword(password)){
                throw createError(403, "Contraseña inválida");
            }

            return res.status(200).json({
                ok: true,
                msg : 'Logueo exitoso',
                user : {
                    name: user.name,
                    _id : user._id,
                },
                token: createJWT({
                    id : user._id
                }),
            })
        } catch (error) {
            errorResponse(res, error, 'Login')
    
        }
    },
    checked : async (req, res) => {
        const {token} = req.query //http://localhost:4000/api/auth/checked?token=jhbjhhjbj  

        try {

            let user = await User.findOne({                 //Busca el usuario asociado al token ingresado.
                token                                           
            })
            
            if(!user ||  !token) throw createError(400, 'Token inválido');   // Validación por parámetro, si no se encuentra usuario asociado al token y/o campo vacío.

            user.checked = true,                        
            user.token = ""                             

            await user.save()                           // Si existe coincidencia, se modifican los atributos del usuario y se guarda.

            return res.status(201).json({
                ok: true,
                msg : 'La cuenta ha sido confirmada con éxito'
            })
            
        } catch (error) {
            errorResponse(res, error, 'Checked')
        }
    },
    sendToken : async (req, res) => {

        const {email} = req.body;

        try {

            let user = await User.findOne({
                email
            })

            if(!user) throw createError(400, 'Email inexistente'); // Validación por POST, funciona para email incorrecto o campo vacío.

            const token = createToken();
            
            user.token = token;

            const userStore = await user.save();

            await forgetPassword({
                name : userStore.name,
                email: userStore.email,
                token : userStore.token
            })

            return res.status(200).json({
                ok: true,
                msg : 'Se te ha enviado un e-mail para reestablecer la contraseña.',
                user : userStore
            })

        } catch (error) {
            errorResponse(res, error, 'SendToken')
        }
    },
    verifyToken : async (req, res) => {

        try {

            const {token} = req.query;
    
            const user = await User.findOne({
                token
            })
    
            if(!user ||  !token) throw createError(400, 'Token inválido');  

            return res.status(200).json({
                ok: true,
                msg : 'Token verificado'
            })

        } catch (error) {
            errorResponse(res, error, 'VerifyToken')
        }
    },

    changePassword : async (req, res) => {

        try {

            const {token} = req.query;
            
            const {password} = req.body;
                
            const user = await User.findOne({
                token
            })

            if(!user ||  !token ) throw createError(400, 'Por favor, revisa los datos ingresados');  

            if(password.includes(' ')) throw createError(400, 'Por favor, ingresa una nueva contraseña');  

            user.password = password;
            user.token = "";
            await user.save();

            return res.status(200).json({
                ok: true,
                msg : 'Se ha guardado tu nueva contraseña.'
            })

        } catch (error) {
            errorResponse(res, error, 'ChangePassword')
        }
    },
}
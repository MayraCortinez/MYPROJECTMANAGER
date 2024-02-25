const nodemailer = require('nodemailer');
require('dotenv').config();

var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    secure: false,
    debug: true
  });


module.exports = {

    confirmRegister : async (user) => {

        const {name, email} = user;

        try {

            const info = await transport.sendMail({
                from : "Project Manager",
                to : email,
                subject : "Confirma tu cuenta en Project Manager",
                text : "Confirma tu cuenta",
                html : `<p> ${name}, para completar tu registro debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/confirm"> Confirmar cuenta </a> `
                })

                console.log(info);
        
        } catch (error) {
                console.error('Error al enviar el correo:', error);
        }    
    },

    forgetPassword : async (user) => {
        
        const {name, email} = user

        try {

            const info = await transport.sendMail({
                from : "Project Manager",
                to : email,
                subject : "Reestablecer contraseña",
                text : "Reestablecer contraseña en Project Manager",
                html : `<p> ${name}, para reestablecer tu contraseña debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/recover-password"> Reestablecer contraseña </a> `
                })
        
        } catch (error) {
                console.error('Error al enviar el correo:', error);
        }          
    }
}
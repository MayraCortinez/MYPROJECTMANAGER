const nodemailer = require('nodemailer');
require('dotenv').config();

var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    debug: true,
    secure: false
  });


module.exports = {

    confirmRegister : async (user) => {

        const {name, email} = user;

        try {

            const info = await transport.sendMail({
                from : 'cortinezmayra89@gmail.com',
                to : email,
                subject : "Confirma tu cuenta en Project Manager",
                text : "Confirma tu cuenta",
                html : `<p> ${name}, para completar tu registro debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/confirm"> Confirmar cuenta </a> `
                })

                console.log(info);
                console.log('correo enviado con éxito')
        
        } catch (error) {
                console.error('Error al enviar el correo:', error);
        }    
    },

    forgetPassword : async (user) => {
        
        const {name, email, token} = user

        try {

            const info = await transport.sendMail({
                from : "cortinezmayra89@gmail.com",
                to : email,
                subject : "Reestablecer contraseña",
                text : "Reestablecer contraseña en Project Manager",
                html : `<p> ${name}, para reestablecer tu contraseña debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/recover-password"> Reestablecer contraseña </a> `
                })
                console.log('correo enviado con éxito')
        } catch (error) {
                console.log('Error al enviar el correo:', error);
        }          
    }
}
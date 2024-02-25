const nodemailer = require('nodemailer');
require('dotenv').config();

const mailPorts = process.env.MAIL_PORT.split(',').map(Number);

const createTransporter = (port) => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: port,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    debug: true,
  });
};

module.exports = {

  confirmRegister: async (user) => {
    const { name, email } = user;

    for (const port of mailPorts) {
      const transporter = createTransporter(port);

      try {
        const info = await transporter.sendMail({
          from: "Project Manager",
          to: email,
          subject: "Confirma tu cuenta en Project Manager",
          text: "Confirma tu cuenta",
          html: `<p> ${name}, para completar tu registro debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/confirm"> Confirmar cuenta </a> `,
        });

        console.log(info);
        console.log(`Correo enviado usando el puerto ${port}`);
        break; // Si tiene éxito, salir del bucle
      } catch (error) {
        console.error(`Error al intentar con el puerto ${port}:`, error.message);
        break;
      }
    }
  },

  forgetPassword: async (user) => {
    const { name, email } = user;

    for (const port of mailPorts) {
      const transporter = createTransporter(port);

      try {
        const info = await transporter.sendMail({
          from: "Project Manager",
          to: email,
          subject: "Reestablecer contraseña",
          text: "Reestablecer contraseña en Project Manager",
          html: `<p> ${name}, para reestablecer tu contraseña debes hacer click en el siguiente enlace : <p>
                 <a href="${process.env.URL_FRONTEND}/recover-password"> Reestablecer contraseña </a> `,
        });

        console.log(info);
        console.log(`Correo enviado usando el puerto ${port}`);
        break; // Si tiene éxito, salir del bucle
      } catch (error) {
        console.error(`Error al intentar con el puerto ${port}:`, error.message);
        break;
      }
    }
  }
};


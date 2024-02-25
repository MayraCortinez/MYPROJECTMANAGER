/* const nodemailer = require('nodemailer');
require('dotenv').config();

const mailPorts = process.env.MAIL_PORT.split(',').map(Number);

async function sendMail() {
  for (const port of mailPorts) {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: port,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      debug: true,
    });

    try {
      const info = await transport.sendMail({
        from: 'your-email@example.com',
        to: 'recipient-email@example.com',
        subject: 'Prueba de Correo',
        text: 'Esto es una prueba de correo.',
      });

      console.log(info);
      console.log(`Correo enviado usando el puerto ${port}`);
      break; // Si tiene éxito, salir del bucle
    } catch (error) {
      console.error(`Error al intentar con el puerto ${port}:`, error.message);
    }
  }
}

sendMail(); */


const sendEmails = require('./helpers/sendEmails'); 

// Ejemplo para probar la función confirmRegister
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
};

sendEmails.forgetPassword(testUser)
  .then(() => console.log('Correo de confirmación enviado con éxito'))
  .catch((error) => console.error('Error al enviar correo de confirmación:', error));

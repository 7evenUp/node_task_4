const nodemailer = require('nodemailer');

module.exports = ({ name, email, message }) => new Promise((resolve, reject) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'sheludeshev.artyom@mail.ru',
      pass: 'aptem2001'
    }
  });

  transporter.sendMail({
    from: 'sheludeshev.artyom@mail.ru', // sender address
    to: 'sheludeshev.artyom@mail.ru', // list of receivers
    subject: 'Сообщение с сайта музыканта Архипова', // Subject line
    html: `Привет! Меня зовут ${name}. Вот мой <a href=mailto:${email}>email</a>. <p>${message}</p>` // html body
  }, (error) => {
    if (error) reject(error);
    resolve();
  });
});
const Joi = require('@hapi/joi');
const nodemailer = require('nodemailer');

const schema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  message: Joi.string()
    .min(2)
    .max(200)
    .required()
});

module.exports = ({ name, email, message }) => new Promise((resolve, reject) => {
  const { error } = schema.validate({ name, email, message });
  if (error) return reject(error.details[0].message);

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
    if (error) return reject(error);
    resolve();
  });
});
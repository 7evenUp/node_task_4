const crypto = require('crypto');
const db = require('../db');

// Для входа:
// email    - admin@mail.ru
// password - admin

exports.setLogin = ({ email, password }) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(16).toString('hex');

  crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, hash) => {
    if (err) reject(err);

    db.set('user', {
      hash: hash.toString('hex'),
      email,
      salt
    }).write();

    resolve();
  });
});

exports.authorization = ({ email, password }) => new Promise((resolve, reject) => {
  const user = db.get('user').value();

  if (email === user.email) {
    crypto.pbkdf2(password, user.salt, 10000, 64, 'sha512', (err, hash) => {
      if (err) reject(err);

      resolve({
        email,
        isAuth: user.hash === hash.toString('hex')
      });
    });
  } else {
    reject('Неверный email');
  }
});
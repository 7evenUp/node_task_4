const fs = require('fs');
const path = require('path');
const uploadDir = path.join(process.cwd(), 'public', 'assets', 'img', 'products');

module.exports = (photo) => new Promise((resolve, reject) => {
  const reader = fs.createReadStream(photo.path);
  const stream = fs.createWriteStream(path.join(uploadDir, photo.name));
  reader.pipe(stream);

  fs.unlink(photo.path, err => {
    if (err) reject(err);
  });
  
  resolve(path.join('assets', 'img', 'products', photo.name));
});
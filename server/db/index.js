const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./server/db/db.json');
const db = low(adapter);

module.exports = db;
const db = require('../db');
const state = db.getState();

exports.renderIndex = async ctx => {
  await ctx.render('pages/index', { skills: state.skills, products: state.products });
}

exports.sendEmail = async ctx => {
  // ...
}
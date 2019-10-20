const sendMail = require('../libs/sendMail');
const db = require('../db');
const state = db.getState();

exports.renderIndex = async ctx => {
  await ctx.render('pages/index', { skills: state.skills, products: state.products, msgsemail: ctx.flash('info')[0] });
}

exports.sendEmail = async ctx => {
  try {
    await sendMail(ctx.request.body);
    ctx.flash('info', 'Письмо отправлено');
    ctx.status = 200;
    ctx.redirect('/');
  }
  catch (err) {
    ctx.flash('info', err);
    ctx.status = 400;
    ctx.redirect('/#status');
  }
}
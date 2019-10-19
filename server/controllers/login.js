const auth = require('../libs/auth');

exports.getLogin = async ctx => {
  if (ctx.session.auth) ctx.redirect('/admin');
  try {
    await ctx.render('pages/login');
  }
  catch (err) {
    console.error(err);
  }
}

exports.auth = async ctx => {
  try {
    const user = await auth.authorization(ctx.request.body)

    if (user.isAuth) {
      ctx.session.auth = true;
      ctx.status = 200;
      ctx.redirect('/admin');
    } else {
      ctx.status = 400;
      ctx.redirect('/login');
    }
  }
  catch (err) {
    console.error(err);
    ctx.flash('info', err);
    ctx.status = 400;
    ctx.redirect('/login');
  }
}
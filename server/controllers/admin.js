const upload = require('../libs/upload');
const db = require('../db');
const Joi = require('@hapi/joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(100).max(10000).required()
})

exports.getAdmin = async ctx => {
  if (!ctx.session.auth) ctx.redirect('/login');
  await ctx.render('pages/admin', { msgskill: ctx.flash('skill')[0], msgfile: ctx.flash('product')[0] });
}

exports.changeSkills = async ctx => {

}

exports.uploadProduct = async ctx => {
  try {
    const newProduct = { ...ctx.request.body };

    try {
      await productSchema.validateAsync(newProduct);
    }
    catch (err) {
      ctx.flash('product', err.details[0].message);
      return ctx.redirect('/admin');
    }

    newProduct.src = await upload(ctx.request.files.photo);

    db.get('products')
      .push(newProduct)
      .write();

    ctx.flash('product', 'Товар добавлен');
    ctx.redirect('/admin');
  }
  catch (err) {
    ctx.flash('product', err)
    console.log(err);
    ctx.redirect('/admin');
  }
}
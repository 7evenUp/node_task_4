const fs = require('fs');
const upload = require('../libs/upload');
const db = require('../db');
const Joi = require('@hapi/joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(100).max(10000).required()
})

exports.getAdmin = async ctx => {
  if (!ctx.session.auth) return ctx.redirect('/login');
  await ctx.render('pages/admin', { msgfile: ctx.flash('product')[0] });
}

exports.changeSkills = async ctx => {
  const fields = { ...ctx.request.body };
  const oldSkills = db.get('skills').value();
  let newSkills = {};

  for (const skill in fields) {
    newSkills[skill] = {};

    newSkills[skill].text = oldSkills[skill].text;

    if (fields[skill]) newSkills[skill].number = fields[skill];
    else newSkills[skill].number = oldSkills[skill].number;
  }

  db.set('skills', newSkills).write();
  return ctx.redirect('/admin');
}

exports.uploadProduct = async ctx => {
  try {
    const newProduct = { ...ctx.request.body };

    try {
      await productSchema.validateAsync(newProduct);
    }
    catch (err) {
      ctx.flash('product', err.details[0].message);

      fs.unlink(ctx.request.files.photo.path, (err) => {
        if (err) console.error(err);
      })

      return ctx.redirect('/admin');
    }

    newProduct.src = await upload(ctx.request.files.photo);
    fs.unlink(ctx.request.files.photo.path, (err) => {
      if (err) console.error(err);
    })

    db.get('products')
      .push(newProduct)
      .write();

    ctx.flash('product', 'Товар добавлен');
    ctx.redirect('/admin');
  }
  catch (err) {
    ctx.flash('product', err)
    ctx.redirect('/admin');
  }
}
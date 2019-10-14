const path = require('path');
const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router();

router.get('/admin', async ctx => {
  await ctx.render('pages/admin')
})

router.post('/admin/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(process.cwd(), 'public', 'assets', 'img', 'products')
  }
}), ctx => {
  console.log('works!')
});

module.exports = router;
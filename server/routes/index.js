const path = require('path');
const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.render('pages/index', {});
})

// router.post('/admin/products', koaBody({
//   multipart: true,
//   formidable: {
//     uploadDir: path.join(process.cwd(), 'public', 'assets', 'img', 'products')
//   }
// }), () => {});

module.exports = router;
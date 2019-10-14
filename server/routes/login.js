const Router = require('koa-router');
const router = new Router();

router.get('/login', async ctx => {
  await ctx.render('pages/login');
})

module.exports = router;
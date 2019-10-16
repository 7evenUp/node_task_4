const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const controller = require('../controllers/index');

router.get('/', controller.renderIndex);
router.post('/', koaBody(), controller.sendEmail);

module.exports = router;
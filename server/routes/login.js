const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const controller = require('../controllers/login');

router.get('/login', controller.getLogin);
router.post('/login', koaBody(), controller.auth);

module.exports = router;
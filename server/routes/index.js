const Router = require('koa-router');
const router = new Router();
const controller = require('../controllers/index');

router.get('/', controller.renderIndex);
router.post('/', controller.sendEmail);

module.exports = router;
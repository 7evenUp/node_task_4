const path = require('path');
const Router = require('koa-router');
const koaBody = require('koa-body');
const controller = require('../controllers/admin');
const router = new Router();
const koaConfig = {
  multipart: true,
  formidable: {
    uploadDir: path.join(process.cwd(), 'public', 'assets', 'img', 'products')
  }
};

router.get('/admin', controller.getAdmin);
router.post('/admin/skills', koaBody(), controller.changeSkills);
router.post('/admin/upload', koaBody(koaConfig), controller.uploadProduct);

module.exports = router;
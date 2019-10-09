const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Pug = require('koa-pug');
const router = require('./routes');

const app = new Koa();
const rootDir = process.cwd();

const pug = new Pug({
  viewPath: path.join(rootDir, 'source', 'template'),
  basedir: path.join(rootDir, 'source', 'template'),
  pretty: false,
  noCache: true,
  app: app
});

app.use(serve(path.join(rootDir, 'public')));
app.use(router.routes());

app.listen(3000, () => console.log('listening'));
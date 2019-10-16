const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Pug = require('koa-pug');
const session = require('koa-session');
const flash = require('koa-better-flash');
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');

const app = new Koa();
const rootDir = process.cwd();

const pug = new Pug({
  viewPath: path.join(rootDir, 'source', 'template'),
  basedir: path.join(rootDir, 'source', 'template'),
  pretty: false,
  noCache: true,
  app: app
});

app.keys = ['keys'];
app.use(session(app));
app.use(flash());

app.use(serve(path.join(rootDir, 'public')));
app.use(indexRoutes.routes());
app.use(loginRoutes.routes());
app.use(adminRoutes.routes());

app.listen(3000, () => console.log('listening'));
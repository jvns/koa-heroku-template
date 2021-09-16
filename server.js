const logger = require('koa-logger');
const router = require('@koa/router')();
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());

// setup views mapping .html
// to the swig template engine
const render = views(path.join(__dirname, './views'), {
  map: { html: 'swig' }
});
app.use(render);

// route definitions

router.get('/', list);

app.use(router.routes());

// index

async function list(ctx) {
  await ctx.render('index', {});
}

// listen

var port = process.env.PORT || 3000;
if (!module.parent) app.listen(port);
console.log('Listening to %s', port);

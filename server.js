const logger = require('koa-logger');
const router = require('@koa/router')();
const views = require('koa-views');
const path = require('path');

// setup views mapping .html
// to the swig template engine

const render = views(path.join(__dirname, './views'), {
  map: { html: 'swig' }
});

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware

app.use(logger());
app.use(render);

// route definitions

router.get('/', list);

app.use(router.routes());

/**
 * Index
 */

async function list(ctx) {
  await ctx.render('index', {});
}

// listen

if (!module.parent) app.listen(3000);

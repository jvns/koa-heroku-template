var fs = require('fs');
var logger = require('koa-logger');
var serve = require('koa-static');
const router = require('@koa/router')();
const Koa = require('koa');
const app = module.exports = new Koa();

// Init logger
app.use(logger());

// Init router
router.get('/', list)
  .get('/get-test', get_test)

app.use(router.routes());

// Init public dir for css, js and etc..
app.use(serve(__dirname + '/public'));

/**
 * Index page
 */

async function list(ctx) {
  var indexHTML = fs.readFileSync(__dirname + '/public/index.html', 'utf-8');
  //await test_pg();
  console.log(ctx)
  await ctx.render('list', indexHTML);
}

async function get_test(ctx) {
  var data = {
    'title': 'Koa test application',
    'body': 'Hello World!'
  };

  await ctx.render('show', data);
}


async function test_pg() {
    const { Client } = require('pg')
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening to %s', port);

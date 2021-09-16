const logger = require('koa-logger');
const router = require('@koa/router')();
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');
const app = module.exports = new Koa();
const { Client } = require('pg')

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
  await test_pg();
  await ctx.render('index', {name: "Winnie The Pooh"});
}

async function test_pg() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

// listen

var port = process.env.PORT || 3000;
if (!module.parent) app.listen(port);
console.log('Listening to %s', port);

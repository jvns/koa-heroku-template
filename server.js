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
  await ctx.render('index', {});
}

async function test_pg() {
    console.log(process.env.DATABASE_URL)
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect()

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}

// listen

var port = process.env.PORT || 3000;
if (!module.parent) app.listen(port);
console.log('Listening to %s', port);

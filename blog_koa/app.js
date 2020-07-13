const Koa = require("koa");
// let router = require("./router");
let router = require("./router/index1");
let bodyParser = require('koa-bodyparser');
const app = new Koa();
// 加载路由
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());
app.listen(4321, (err) => { 
    if (err) throw err
    console.log("> Ready on http://localhost:4321")
})
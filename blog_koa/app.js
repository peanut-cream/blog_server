const Koa = require("koa");
// let router = require("./router");
let router = require("./router/index1");
let cors = require('koa2-cors');
let adminRouter = require("./router/adminRouter");
let bodyParser = require('koa-bodyparser');
const Koa_Session = require('koa-session');   // 导入koa-session 
// 检测是否登录
let checkOpenId = require("./middleware/checksession")
const app = new Koa();
const session_config = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 60*60*24*1000*10,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: false, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
// 加载路由
app.keys=["some secret hurr"];
app.use(Koa_Session(session_config, app))
    .use(cors({
        credentials: true,
    })).use(checkOpenId())
    // .use(async (ctx, next)=> {
    //     // ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    //     // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //     // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //     ctx.set('Access-Control-Allow-Credentials', true);
    //     if (ctx.method == 'OPTIONS') {
    //         ctx.body = 200; 
    //     } else {
    //         await next();
    //     }
    // })
    .use(bodyParser())
    .use(router.routes()).use(router.allowedMethods())
    .use(adminRouter.routes()).use(adminRouter.allowedMethods());
app.listen(4321, (err) => { 
    if (err) throw err
    console.log("> Ready on http://localhost:4321")
})
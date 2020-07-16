// 实例化路由
let Router = require("koa-router");
let router = new Router({
    prefix: '/admin'
})
let  { getLogin } =require("../controller/login");
router.post("/login", getLogin)
router.get("/", async (ctx) => { 
    console.log(ctx.session.openId,'123');
    ctx.body = {
        code:200
    }
})
module.exports= router;
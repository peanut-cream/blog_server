// 实例化路由
let Router = require("koa-router");
let router = new Router({
    prefix: '/admin'
})
let  { getLogin ,checkOpenID} =require("../controller/login");
let  { Addarticle } =require("../controller/blogList");
router.post("/login", getLogin)
router.post("/checkOpenID", checkOpenID)
router.post("/Addarticle", Addarticle)
router.get("/", async (ctx) => { 
    console.log(ctx.session.openId,'123');
    ctx.body = {
        code:200
    }
})
module.exports= router;
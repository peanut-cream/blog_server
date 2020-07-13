// 实例化路由
let Router = require("koa-router");
let router = new Router({
    prefix: '/api'
})
let { register ,getuserList} = require("../controller/login");
let { getList } = require("../controller/blogList");
// 获取列表
router.get("/user",getuserList)
router.get("/list",getList)
// 注册
router.post("/register", register);
module.exports= router;
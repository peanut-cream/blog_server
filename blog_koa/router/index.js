// 实例化路由
let router = require("koa-router")();
let  mongoway=require("../mongodb")
router.get("/", async (ctx) => {
    await mongoway.find({
        fn: (res) => { 
            console.log(res);
            ctx.body = res;
        }
    })
})
router.post("/", async (ctx) => {
    try {
        let data = {...ctx.request.body};
        for (let k in data) { 
            if (["name", "password"].indexOf(k) < 0) { 
                delete data[k];
            }
        }
        if (!data.name) { 
            ctx.status = 400;
            ctx.body = {
                code:400,
                data: {
                    message:"昵称字段不能为空"
                }
            };
            return
        }
        if (!data.password) { 
            ctx.status = 400;
            ctx.body = {
                code:400,
                data: {
                    message:"密码不能为空"
                }
            };
            return
        }
        await mongoway.find({
            obj: { name: data.name },
            fn: (res) => {
                if (res.length > 0) { 
                    ctx.status = 400;
                    ctx.body = {
                        code:400,
                        data: {
                            message:"昵称重复，请重新填写"
                        }
                    };
                    throw new Error("昵称重复");
                }
            }
        })
        if (data.password.length < 4) {
            ctx.status = 400;
            ctx.body = {
                code:400,
                data: {
                    message:"密码不能小于4位"
                }
            };
            throw new Error("密码不能小于4位");
        }
        await mongoway.add({
            obj: data,
            fn: (res) => { 
                ctx.body = {
                    code:200,
                    data: {
                        message: "成功",
                        data:res
                    }
                };
            }
        })
    } catch (error) {
        console.log(error,1)
    }
    
    
    // ctx.response.status = 405;
    // ctx.body="post请求"+JSON.stringify(ctx.request.body)
})
module.exports= router;
module.exports = options =>{
    return async function adminauth(ctx,next){
        if (ctx.url != "/admin/login"&&ctx.method=="POST") {
            if (ctx.session.openId) {
                await next()
            } else {
                ctx.body = { data: '没有登录',code:401 }
            }
        } else { 
            await next()
        }
    }
}
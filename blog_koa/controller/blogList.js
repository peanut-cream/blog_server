
let blogSchema = require("../mongodb/mongoose/models/blog")
let { findOneAndUpdate } =require("../mongodb/mongoose/operation/idOperation")
let moment = require("moment");
async function queryList(ctx,api) { 
    if (ctx.querystring && ctx.query.id) {
        let respone
        if (api) {
            respone = await blogSchema.find({ id: Number(ctx.query.id), publicTime: { $lt: new Date() }, status: 2 }, {}, { lean: true });
        } else { 
            respone = await blogSchema.find({ id: Number(ctx.query.id),}, {}, { lean: true });
        }
        (respone).forEach(ele => {
            ele.createTime = new Date(ele.createTime) - 0;
            ele.createTime_at = moment(ele.createTime).format("YYYY-MM-DD");
        });
        ctx.body = {
            code: 200,
            data: respone
        }
    } else { 
        let respone
        if (api) {
            respone = await blogSchema.find({ publicTime: { $lt: new Date() }, status: 2 }, {}, { lean: true });
        } else { 
            respone = await blogSchema.find({ publicTime: { $lt: new Date() }, }, {}, { lean: true });
        }
        (respone).forEach(ele => {
            ele.createTime = new Date(ele.createTime) - 0;
            ele.createTime_at = moment(ele.createTime).format("YYYY-MM-DD");
        });
        ctx.body = {
            code: 200,
            data: respone
        }
        return
    }
}
exports.getList = async (ctx) => { 
    queryList(ctx, true);
}
exports.Addarticle = async (ctx) => { 
    let parms = { ...ctx.request.body };
    if (!parms.title) return ctx.body = { code: 401, msg: "标题不能为空" };
    if (!parms.desc) return ctx.body = { code: 401, msg: "介绍不能为空" };
    if (!parms.context) return ctx.body = { code: 401, msg: "文章不能为空" };
    if (!parms.status) parms.status = 1;//如果没有状态默认给个状态 1，草稿
    let data = await new blogSchema({ ...parms, id: (await findOneAndUpdate("blog_id")).autoadd }).save();
    ctx.body = {
        code: 200,
        msg: data.status===2?"发布成功":"保存成功",
        data
    }
    
}
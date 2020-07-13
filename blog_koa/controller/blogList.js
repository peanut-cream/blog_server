
let blogSchema =require("../mongodb/mongoose/models/blog")
let  moment =require("moment")
exports.getList = async (ctx) => { 
    if (ctx.querystring && ctx.query.id) {
        let respone = await blogSchema.find({id:Number(ctx.query.id)}, {}, { lean: true });
        (respone).forEach(ele => {
            ele.createTime = new Date(ele.createTime) - 0;
            ele.createTime_at = moment(ele.createTime).format("YYYY-MM-DD");
        });
        ctx.body = {
            code: 200,
            data: respone
        }
    } else { 
        let respone = await blogSchema.find({}, {}, { lean: true });
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
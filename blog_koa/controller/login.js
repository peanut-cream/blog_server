let userModel = require("../mongodb/mongoose/models/user");
let { findOneAndUpdate } =require("../mongodb/mongoose/operation/idOperation")
const md5 = require('../utils/md5')

// 注册
exports.register=async (ctx) => {
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
            ctx.throw(400, 'name required', ctx.body);
        }
        if (!data.password) { 
            ctx.body = {
                code:400,
                data: {
                    message:"密码不能为空"
                }
            };
            ctx.throw(400, 'password required', ctx.body);
        }
        if ((await userModel.find({ name: data.name })).length>0) { 
            ctx.status = 400;
            ctx.body = {
                code:400,
                data: {
                    message:"昵称重复，请重新填写"
                }
            };
            ctx.throw(400, 'name conflict', ctx.body);
        }
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
        console.log(await findOneAndUpdate("id"))
        let body = await new userModel({
            ...data, password: md5(data.password), id: (await findOneAndUpdate("id")).autoadd
        }).save();
        ctx.body = {
            code:200,
            data: {
                message: "成功",
                data:body
            }
        };
    } catch (error) {
        console.log(error,1)
    }
}


exports.getuserList = async (ctx) => {
    let body = await userModel.find({}, { password: 0 });
    ctx.body = {
        data:body
    }
}
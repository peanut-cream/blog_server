let mongoose = require("../mongoose");
let Schema = mongoose.Schema; 
let UserIdSchema = new Schema({
    field: { type: String,},
    autoadd: { type: Number },
})
module.exports = mongoose.model('user_id', UserIdSchema, "user_id");
// 设置连接数据 集合 ，第三个参数是集合名称，不写，默认model找它的复数
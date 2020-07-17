let mongoose = require("../mongoose");
let Schema = mongoose.Schema; 
let blogSchema = new Schema({
    title: { type: String,required:true },
    context: { type: String, required: true },
    desc: { type: String, required: true },
    createTime: { type: Date, default: new Date() },
    publicTime: { type: Date, default: new Date() },
    status: { type: Number, default:1},
    id: { type: Number},
    hot: {
        type:Number,default:0
    }
})
module.exports = mongoose.model('blog',blogSchema,"blog");
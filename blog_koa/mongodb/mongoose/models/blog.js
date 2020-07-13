let mongoose = require("../mongoose");
let Schema = mongoose.Schema; 
let blogSchema = new Schema({
    title: { type: String,required:true },
    context: { type: String, required: true },
    createTime: { type: Date, default: new Date() },
    hot: {
        type:Number,default:0
    }
})
module.exports = mongoose.model('blog',blogSchema,"blog");
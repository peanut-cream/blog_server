let mongoose = require("../mongoose");
let Schema = mongoose.Schema; 
let UserSchema = new Schema({
    name: { type: String,required:true },
    password: { type: String ,required:true},
    id: { type: Number },
})
module.exports = mongoose.model('User',UserSchema);
let mongoose = require('mongoose');//使用mongoose连接mongodb
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:true});
let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
    console.log("连接成功！")
  // we're connected!
});
db.on('disconnected', function () {
    console.log("断开连接")
  // we're connected!
});
module.exports = mongoose;
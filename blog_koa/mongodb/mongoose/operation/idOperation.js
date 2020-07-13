let UserIdSchema = require("../models/user_id");
// id自动增长
exports.findOneAndUpdate=async( sequenceName )=> {
    return await UserIdSchema.findOneAndUpdate({
        field: sequenceName
    },
    {
        $inc: {
            autoadd:1
        }

    })
}
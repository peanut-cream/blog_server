const monk = require('monk');//使用monk来操作mongodb

// Connection URL
const url = 'localhost:27017/blog';
async function getNextSequenceValue({ sequenceName,fn}) {
    await monk(url).get("user_id").findOneAndUpdate({
        field: sequenceName
    },
        {
            $inc: {
                autoadd:1
            },

        }).then(res => { 
             fn(res);
        })
}

// 查询mongodb中数据
exports.find = async ({ collection, fn,obj}) => { 
    collection = collection || "users";
    const db = monk(url);
    const users = db.get(collection);
    await users.find({...obj}).then((res) => {
        console.log('Connected correctly to server:search')
        fn(res);
    }).then(() => { 
        db.close();
    })
}
exports.add = async ({ collection, fn,obj}) => { 
    collection = collection || "users";
    const db = monk(url);
    const users = db.get(collection);
    let id;
    await getNextSequenceValue({
        sequenceName:"id", fn:(res) => { 
            id = res.autoadd;
        }
    });
    await users.insert({ ...obj,id}).then((res) => {
        console.log('Connected correctly to server:add')
        fn(res);
    }).then(() => { 
        db.close();
    })
}

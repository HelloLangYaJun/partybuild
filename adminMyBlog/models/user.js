const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    id:{
        type: String,
        default: 0
    },
    identity:{
        type: String,
        default: '群众'
    },
    integral:{
        type: Number,
        default: '500'
    },
    money:{
        type: Number,
        default: '500'
    },
    password: String,
    avatar: {
        type: String,
        default: 'http://pic.eastlady.cn/uploads/tp/201604/64/38.jpg'
    },
       
}, {versionKey: false})

module.exports = mongoose.model("user", user)
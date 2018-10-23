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
        default: '50'
    },
    money:{
        type: Number,
        default: '500'
    },
    password: String,
    avatar: {
        type: String,
        default: 'http://pic.eastlady.cn/uploads/tp/201604/64/38.jpg',
    },
    jifen:[
        {      
            Number: Number, 
            content: String,
            date: { type: Date, default: Date.now },
        }
    ],
    date: { type: Date, default: Date.now },     
}, {versionKey: false})

module.exports = mongoose.model("user", user)
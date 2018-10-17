const mongoose = require("mongoose");
const message = new mongoose.Schema({
    content: String,
    type: {
        type: String,
        default: 'message'
    },
    authorMsg: Object,
    toauthor:Object,    
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("message", message)
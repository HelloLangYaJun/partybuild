const mongoose = require("mongoose");
const think = new mongoose.Schema({
    content: String,
    type: {
        type: Boolean,
        default: false
    },
    authorMsg: Object,
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("think", think)
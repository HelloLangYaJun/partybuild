const mongoose = require("mongoose");

const article = new mongoose.Schema({
    author: {
        type: String,
        default:'',
      
    },
    title: {
        type: String,
       
    },
    pic:{
        type: String,
        default:'',
       
    },
    content: {
        type: String,
        default:'',
       
    },
    count:{
        type: Number,
        default:0,
        
    },
    type:{
        type: Number,
      
    },
   
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("article", article)
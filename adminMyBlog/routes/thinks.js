const {Router} = require("express");
const router = Router();
const think = require('../models/think')

//发布评论
router.post('/think', (req, res) =>{
    if(req.session.user) {
        let {content} = req.body
        think.create({
            content,
            type:false,
            authorMsg: req.session.user
        }).then(data => {
            res.json({
                code: 200,
                data,
                msg: '提交报告成功'
            })
        })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能提交报告'
        })
    }
})
//获取报告
router.get('/think', (req, res) =>{
    if(req.session.user) {
       think.find({authorMsg:req.session.user}).then(data=>{
        res.json({
            code: 200,
            data,
            msg: '成功'
        })
       })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能提交报告'
        })
    }
})

module.exports = router;
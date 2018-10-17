const {Router} = require("express");
const router = Router();
const message = require('../models/message')

//发布评论
router.post('/message', (req, res) =>{
    if(req.session.user) {
        let {content,toauthor,type} = req.body
        message.create({
            content,
            type,
            toauthor,
            authorMsg: req.session.user
        }).then(data => {
            res.json({
                code: 200,
                data,
                msg: '评论回复成功'
            })
        })
    }
    else {
        res.json({
            code: 403,
            msg: '未登录不能发布评论'
        })
    }
})
//获取评论
router.get('/message', (req, res) =>{
    let {pn=1,size=10} = req.query;
    message.find({}).limit(size).skip((pn-1)*size).sort({_id:-1}).then(data=>{
        res.json({
            code: 200,
            data,
            msg: '查找成功'
        })
    }).catch(err=>{
        res.json({
            code: 400,
            msg: err
        })
    })
})

module.exports = router;
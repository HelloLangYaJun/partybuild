const {Router} = require("express");
const router = Router();
const message = require('../models/message')
const user =require('../models/user')
//发布评论
router.post('/message', (req, res) =>{
    if(req.session.user) {
        let {content,toauthor,type} = req.body
        user.findOne({id:req.session.user.id}).then(data1=>{
            message.create({
                content,
                type,
                toauthor,
                authorMsg: data1
            }).then(data2 => {
                res.json({
                    code: 200,
                    data:data2,
                    msg: '评论回复成功'
                })
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
        user.findOne({id:req.session.user.id}).then(data1=>{
            for(let i=0;i<data.length;i++){
                data[i].authorMsg=data1
            }
            res.json({
                code: 200,
                data,
                msg: '查找成功'
            })
        })
      
    }).catch(err=>{
        res.json({
            code: 400,
            msg: err
        })
    })
})

module.exports = router;
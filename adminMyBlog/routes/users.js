const {Router} = require("express");
const router = Router();
const user = require('../models/user')
router.get('/user',(req,res)=>{
  if(req.session.user){
      user.findOne({id:req.session.user.id}).then(data=>{
          console.log(data)
        res.json({
            code: 200,
            data:data,
            msg: '已登录'
        })
      })
  }
  else{
    res.json({
        code: 400,
        msg: '未登录'
    })
  }
})
//更新密码
router.post('/updatepsd',(req,res)=>{
    let {newpsd, oldpsd} = req.body;
    if(req.session.user.password==oldpsd){
        user.update({id:req.session.user.id},{$set:{password:newpsd}}).then(data=>{
            req.session.destroy();
            res.json({
                code: 200,
                data,
                msg: '修改成功，请重新登录'
            })
        })
    }
    else{
        res.json({
            code: 400,
            msg: '密码错误'
        })
    }
})
//缴纳党费
router.post('/paymoney',(req,res)=>{
    let {money} = req.body;
        user.update({id:req.session.user.id},{$inc:{money:-money}}).then(data=>{
            req.session.user.money-=money
            res.json({
                code: 200,
                data,
                msg: '缴费成功'
            })
        }).catch(err=>{
            res.json({
                code: 200,
                msg: '缴费失败'
            })
        })
})
//登录
router.post('/login', (req, res) => {
    let {id, password} = req.body;
    user.findOne({id}).then((data) => {
        if (!data) {
            res.json({
                code: 401,
                msg: '该用户名不存在'
            })
        }
        else if (data.password != password) {
            res.json({
                code: 401,
                msg: '密码不正确'
            })
        }
        else if (data.password == password) {
            req.session.user = data;
            console.log(req.session.user)
            res.json({
                code: 200,
                data,
                msg: '登录成功'
            })
        }
    })
})

// router.delete('/logOut', (req, res) => {
//     console.log(req.session.user)
//     user.update({_id:req.session.user._id},{})
//     req.session.destroy(function (err) {
//         if(err){
//             console.log(err)
//         }
//         else {
//             // res.clearCookie('sid');
//             res.json({
//                 code: 200,
//                 msg: '退出登陆成功'
//             })
//         }
//     })
// })
//注册
router.post('/user', (req, res) => {
    let {username, id, password} = req.body;
    console.log(username, id, password)
    if(username&&password&&id){
        user.findOne({id:id}).then(data=>{
            if(data){
               res.json({
                   code: 401,
                   msg: '该身份已注册'
               })
            }
            else{
               user.create({
                   username,
                   password,
                   id,
                    }).then((data) => {
                   res.json({
                       code: 200,
                       data,
                       msg: '注册成功'
                   })
               })
            }
        })
    }
    else{
        res.json({
            code: 402,
            msg: '信息填写不完整'
        })
    }
})

module.exports = router;

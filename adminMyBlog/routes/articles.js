const {Router} = require("express");
const router = Router();
const article = require('../models/articles')

//发布文章
//发布评论
router.post('/articles', (req, res) => {
        let {content} = req.body
        article.create({
            author:'',
            title:'',
            pic:'',
            content,
            count:0,
            type:0,
        }).then(data => {
            res.json({
                code: 200,
                data,
                msg: '插入历史成功'
            })
        })
})
router.get('/articles', (req, res) => {
    article.find({}).then(data => {
        res.json({
            code: 200,
            data,
            msg: '查找成功'
        })
    })

})

module.exports = router;

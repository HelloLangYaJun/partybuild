const {Router} = require("express")
const router = Router()
const path = require('path')

const articles = require('./articles')
const users = require('./users')
const message = require('./messages')
router.use(articles)
router.use(users)
router.use(message)
module.exports = router;
const {Router} = require("express")
const router = Router()
const path = require('path')

const articles = require('./articles')
const users = require('./users')
const message = require('./messages')
const think = require('./thinks')
router.use(articles)
router.use(users)
router.use(message)
router.use(think)
module.exports = router;
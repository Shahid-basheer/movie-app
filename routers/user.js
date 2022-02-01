const express = require('express')
const router = express.Router()
const controllers = require('../controller/users')

router.post('/user-register',controllers.register)
router.get('/checkname/:id',controllers.checkName)
router.get('/checkemail/:id',controllers.checkEmail)
router.get('/checknumber/:id',controllers.checkNumber)
router.post('/register-comment',controllers.commentPost)
router.get('/get-comment/:id',controllers.getComment)
router.post('/user-login',controllers.login)


module.exports = router
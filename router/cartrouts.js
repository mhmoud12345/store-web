const http = require('http')
const express = require('express')
const router = express.Router()
const path = require('path')

 const cartcontroller=require('../controller/cartcontroler')


router.get('/newuser',cartcontroller.getnewuser)
router.post('/newuser',cartcontroller.postnewuser)












module.exports = router
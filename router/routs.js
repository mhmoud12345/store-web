const http = require('http')
const express = require('express')
const router = express.Router()
const path = require('path')
const  controllerMain=require('../controller/main')

router.get('/',controllerMain.feichAllrecp);

module.exports = router
const http = require('http')
const express = require('express')
const router = express.Router()
const path = require('path')
const  controllerMain=require('../controller/main')

router.get('/', controllerMain.getAllpruducts);
router.get('/newproduct',controllerMain.addproduct)
router.get('/editproduct/:_id', controllerMain.geteditproduct)
router.get('/deleteproduct/:_id', controllerMain.getdeleteproduct)
router.get('/details/:_id', controllerMain.getdetails)

router.post('/newproduct',controllerMain.postproduct)
router.post('/editproduct',controllerMain.posteditproduct)
router.post('/deleteproduct',controllerMain.postdeleteproduct)

module.exports = router
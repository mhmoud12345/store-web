const http = require('http')
const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
const path = require('path')
const  controllerMain=require('../controller/main')
const middleware=require('../middleware/middleware')

router.get('/', controllerMain.getAllpruducts);
// routes used by main.ejs view
router.get('/products/new', controllerMain.getNewProducts);
router.get('/categories/:category', controllerMain.getCategoryProducts);
router.get('/add-to-cart/:id', controllerMain.addToCart);
router.get('/signup', authController.getsignup);
router.get('/signin', authController.getsignin);
router.get('/newproduct',middleware.isadmin,controllerMain.addproduct)
router.get('/editproduct/:_id', middleware.isadmin, controllerMain.geteditproduct)
router.get('/deleteproduct/:_id', middleware.isadmin, controllerMain.getdeleteproduct)
router.get('/details/:_id', controllerMain.getdetails)
router.get('/logout', authController.logout);
router.get("/categories/:category", controllerMain.getCategoryProducts);

router.post('/newproduct',controllerMain.postproduct)
router.post('/editproduct',controllerMain.posteditproduct)
router.post('/deleteproduct',controllerMain.postdeleteproduct)
router.post('/signin', authController.postsignin);
router.post('/signup', authController.postsignup);
router.get("/admin/categories", controllerMain.getAddCategory);
router.post("/admin/categories", controllerMain.postAddCategory);


module.exports = router
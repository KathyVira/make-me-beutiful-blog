const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/category');


//--->    validators    <---///
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin,  adminMiddleware} = require('../controllers/auth');

//create new
router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);

//get list of categories
router.get('/categories', list);

//get one category
router.get('/category/:slug', read);

//delete remove category only for admin
router.delete('/category/:slug',requireSignin, adminMiddleware, remove);




module.exports =  router;
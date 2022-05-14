const express = require('express');
const router = express.Router();


//--->    controllers    <---///
const { requireSignin,  adminMiddleware} = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag');


//--->    validators    <---///
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');

//create new
router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, create);

//get list of categories
router.get('/tags', list);

//get one category
router.get('/tag/:slug', read);

//delete remove category only for admin
router.delete('/tag/:slug' ,requireSignin, adminMiddleware, remove);




module.exports =  router;
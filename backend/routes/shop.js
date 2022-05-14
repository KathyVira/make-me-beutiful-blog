const express = require('express');
const router = express.Router();
const {create} = require('../controllers/shop');
const { requireSignin, adminMiddleware} = require('../controllers/auth');

router.post('/shop', requireSignin, adminMiddleware, create);

module.exports = router;
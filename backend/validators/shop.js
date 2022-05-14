const { check } = require('express-validator');

exports.shopCreateValidator = 

[
    
    check('name', 'place Name is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('Name is required!')      
        ,
    check('email', 'Must be valid email address')
        .isEmail()
        //.normalizeEmail()
        .withMessage('Must be valid email address')        
        ,
        
    check('phone', 'correct Phone is required')
        .not()
        .isEmpty()
        .isLength({min:9})
        .withMessage('correct Phone is required')
        ,
              
    check('city', 'city is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('city is required!')      
    ,
    check('days', 'days is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('days is required!')      
    ,
    check('startTime', 'startTime is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('startTime is required!')      
    ,
    check('endTime', 'endTime is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('name is required!')      
    ,
        
        
]
;
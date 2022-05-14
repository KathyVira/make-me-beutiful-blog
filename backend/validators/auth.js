const { check } = require('express-validator');

exports.userSignupValidator = 

[
    
    check('name', 'name is required!')
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
        /*
    check('phone', 'correct Phone is required')
        .not()
        .isEmpty()
        .isLength({min:9})
        .withMessage('withMessage: correct Phone is required')
        ,
        */
    check('password', 'Password must be at least 6 characters long')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        
        
        
]
;

exports.userSigninValidator = [

    check('email')
        .isEmail()
        .withMessage('Must be valid email address'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
     
];

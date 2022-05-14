const { check } = require('express-validator');

exports.categoryCreateValidator = 

[
    
    check('name', 'name is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('Category name is required!')      
        ,

        
        
        
]
;
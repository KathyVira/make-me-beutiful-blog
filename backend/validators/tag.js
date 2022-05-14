const { check } = require('express-validator');

exports.tagCreateValidator = 

[
    
    check('name', 'name is required!')
        .not()
        .isEmpty()
        //.escape()
        .withMessage('Tag name is required!')      
        ,

        
        
        
]
;
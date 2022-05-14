

const User = require('../models/user');



exports.read = (req, res) => {

    //console.log('req.profile: ',req.profile);
    req.profile.hashed_password = undefined ;
    return res.json(req.profile);
};



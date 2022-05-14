const Shop = require('../models/shop');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable');
const slugify = require('slugify');
const {stripHtml} = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');

const fs = require('fs');
const {smartTrim} = require('../helpers/smartTrim');

//create new shop
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
            if(err){
                return res.status(400).json(
                    {
                        error: 'Image canot not upload'
                    }
                );
            };
        

            const{ shopname, email, phone, city, about, 
                days, startTime, endTime, 
                categories, tags} = fields;
                //console.log(" shopname: ",shopname, ". email: ",email," city: ",city, ". about: ",about, ". categories: ",categories, ". tags: ",tags);

                if (!shopname || !shopname.length) {
                    return res.status(400).json({
                        error: 'Shop name is required'
                    });
                }

                
                if (!email || !email.length) {
                    return res.status(400).json({
                        error: 'Email name is required'
                    });
                }

                if (!about || about.length === 0) {
                    return res.status(400).json({
                        error: 'About is required'
                    });
                }

                if (!categories || categories.length === 0) {
                    return res.status(400).json({
                        error: 'At least one category is required'
                    });
                }
        
                if (!tags || tags.length === 0) {
                    return res.status(400).json({
                        error: 'At least one tag is required'
                    });
                }


            let shop = new Shop();

            shop.shopname = shopname;
            shop.slug = slugify(shopname).toLowerCase();
            shop.email = email;
            shop.phone = phone;
            shop.city = city;
            shop.about = about;
            shop.excerpt = smartTrim(about, 200, ' ', ' ...');

            shop.metatitle = `${shopname} | ${process.env.APP_NAME}`;
            shop.metadesc = stripHtml(about.substring(0,160)).result;

            // shop.logoImg = logoImg;
            shop.days = days && days.split(','); ;
            shop.startTime = startTime;
            shop.endTime = endTime;
            shop.owner = req.user._id
               // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

            // console.log( "photo: ", fs.readFileSync(files.photo.path));

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1MB in size'
                    });
                };
                shop.photo.data = fs.readFileSync(files.photo.path);
                shop.photo.contentType = files.photo.type;
            }

            shop.save((err, result) => {
                if (err){
                    return res.status(400)
                        .json({
                            error: errorHandler("save error: ",err)
                            })
                    };

                res.json(result);

                Shop.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler("categories error: ",err)
                            });
                        } else {
                            Shop.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
                                (err, result) => {
                                    if (err) {
                                        return res.status(400).json({
                                            error: errorHandler("tags error: ",err)
                                        });
                                    } else {
                                        res.json(result);
                                    }
                                }
                            );
                        }
                    }
            
            );

        });
    });
};

//show all shops
exports.list = (req,res) => {
    // Shop.find({}).exec((err,data) =>{
    //     if(err){
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         })
    //     }
    //     res.json(data);
    // });
};

//show one shop
exports.read = (req,res) => {
    // const slug = req.params.slug.toLowerCase();

    // Shop.findOne({slug}).exec((err, shop) =>{
    //     if(err){
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         })
    //     }
    //     res.json(shop);
    // });
};


//Remove shop
exports.remove = (req,res) => {
    // const slug = req.params.slug.toLowerCase();

    // Shop.findOneAndRemove({ slug }).exec((err, data) =>{
    //     if(err){
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         })
    //     }
    //     res.json({
    //         message: 'Shop deleted sussefuly'
    //     });
    // });
};


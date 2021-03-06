const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');
const formidable = require('formidable');
const slugify = require('slugify');
const {stripHtml}  = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');

const fs = require('fs');
const {smartTrim} = require('../helpers/smartTrim')

//create new blog
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json(
                {
                    error: 'Image could not upload'
                }
            );
        };

        const { title, body, categories, tags } = fields;

        //console.log(" title: ",title, ". body: ",body, ". categories: ",categories, ". tags: ",tags);

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'Title is required'
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
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

        let blog = new Blog();

        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 200, ' ', ' ...');
        blog.slug = slugify(title).toLowerCase();

        blog.metatitle = `${title} | ${process.env.APP_NAME}`;

        blog.metadesc = stripHtml(body.substring(0, 160)).result;

        blog.postedBy = req.user._id;

        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1MB in size'
                });
            }
            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {

            if (err) {
                return res.status(400).json({
                    error: errorHandler("save error: ", err)
                });
            }

            // res.json(result);


            Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler("categories error: ",err)
                        });
                    } else {
                        Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
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

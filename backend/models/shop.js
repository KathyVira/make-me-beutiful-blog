const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const shopSchema = new mongoose.Schema(
    {
        shopname: {
            type: String,
            trim: true,
            required: true,
            max: 160,
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: Number,
            country: Number,
        },
        city: {
            type: String,
            trim: true,
            required: true,
            max: 32,
        },
        about: {
            type: {},
            min: 150,
            max: 2000000,
        },
        excerpt: {
            type: String,
            max: 1000,
        },
        
        metatitle: {
            type: String,
        },
        metadesc: {
            type: String,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        alt:{
            type: String,
        },
        days: [{
            type: Array,
            trim: true,
            max: 32,          
          }],

        startTime: {
            type: Number,
            trim: true,
            max: 32,
        },
        
        endTime: {
            type: Number,
            trim: true,
            max: 32,
        },

        categories:[{
            type: ObjectId, 
            ref: 'Category',
            required: true
        }],

        tags:[{
            type: ObjectId, 
            ref: 'Tag', 
            required: true
        }],

        owner:{
            type: ObjectId,
            ref:'User'
        }
   
    },
    {timestamps: true}
);


module.exports = mongoose.model('Shop', shopSchema);
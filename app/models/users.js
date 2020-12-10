'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    hobbies:{
        type: ObjectId,
        ref: 'hobby',
        required: true
    }
});

module.exports = mongoose.model('user', userSchema, 'users');

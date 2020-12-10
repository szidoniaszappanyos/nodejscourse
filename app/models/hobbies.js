'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hobby_type: {
        type: String,
        required: true,
        unique: false
    },
    details: {
        equipment_required: {
            type: Boolean
        },
        costs_to_practice: {
            type: Number
        }
    },
    practice_buddies: [
        {
            name: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('hobby', hobbySchema, 'hobbies');

const Joi = require("joi")
const mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    //   User Information ........
    names: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },

    email: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },

    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    //    Card information ..........

    card_no: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    found_at: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    card_pic: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    found_on: {
        type: Date,
        required: false
    },
    how_can_be_found: {
        type: String,
        required: true,
        minlength: 20
    }
});

const SeenCard = mongoose.model('SeenCard', cardSchema);

function validateSeenCard(seenCard) {
    const Schema = {
        names: Joi.string().required().min(3),
        email: Joi.string().min(3),
        phone: Joi.string().required().min(3),
        address: Joi.string().required().min(3),

        card_pic: Joi.string().required().min(5),
        card_no: Joi.string().min(3).required(),
        category_id: Joi.string().min(3).required(),
        found_at: Joi.string().min(3).required(),
        found_on: Joi.date().min(3),
        how_can_be_found: Joi.string().min(20),
    }

    Joi.validate(seenCard, Schema)
}

module.exports.SeenCard = SeenCard
module.exports.validator = validateSeenCard
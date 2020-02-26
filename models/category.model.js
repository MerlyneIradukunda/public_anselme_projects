const mongoose = require('mongoose');
const Joi = require("joi")
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(user){
    const Schema = {
        name : Joi.string().min(3).max(20).required()
    }
    Joi.validate(user,Schema)
}

module.exports.Category = Category
module.exports.validator = validateCategory

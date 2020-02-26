const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    regDate: {
        type: String,
        required: true
    },

});



const User = mongoose.model('User', userSchema);


userSchema.methods.Token = function() {
    const ONE_DAY = 60 * 60 * 24;
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        name: this.name,
        gender: this.gender,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password
    }, config.get('yange-private-key'), {
        expiresIn: ONE_DAY
    });
    return token
}


function validateUser(user) {
    const schema = {
        name: Joi.string().max(255).min(5).required(),
        gender: Joi.string().max(6).min(1).required(),
        email: Joi.string().max(255).min(5).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(20).required(),
    }
    return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validate = validateUser
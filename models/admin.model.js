const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')


var adminSchema = new mongoose.Schema({
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

    },
    phoneNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true
    },
    regDate: {
        type: String,
        required: true
    }
});


const admin = mongoose.model('Admins', adminSchema);

adminSchema.methods.Token = function() {
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

function validateAdmin(admin) {
    const schema = {
        name: Joi.string().max(255).min(5).required(),
        gender: Joi.string().max(6).min(2).required(),
        email: Joi.string().max(255).min(5).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().required(),
    }
    return Joi.validate(admin, schema)
}

module.exports.Admin = admin
module.exports.validateAdmin = validateAdmin
const Joi = require("joi")
const mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    seen_id:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    user_id:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification

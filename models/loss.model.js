const mongoose = require('mongoose')
const Joi = require('joi')


var lossSchema = new mongoose.Schema({

    cardId: {
        type: String,
        required: false
    },
    placeOfLost: {
        type: String,
        required: true
    },
    timeOfLost: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
    },
    description: {
        type: String,
        required: true
    }


})

const Loss = mongoose.model('lostCards', lossSchema);

function validateLoss(loss) {
    const schema = {
        cardId: Joi.string().max(16).min(16).required(),
        placeOfLost: Joi.string().required(),
        timeOfLost: Joi.date().required(),
        category_id: Joi.string().min(3).required(),
        description: Joi.string().max(255).min(3).required(),
    }
    return Joi.validate(loss, schema)
}

module.exports.Loss = Loss
module.exports.validate = validateLoss
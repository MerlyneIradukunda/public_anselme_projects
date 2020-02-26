const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const { User } = require('../models/user.model')
const { Admin } = require('../models/admin.model')

var router = express.Router();

router.post('/jwt', async(req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({ phoneNumber: req.body.phoneNumber })
    if (!user) return res.send('Invalid credentials').status(400)

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.send('Invalid credentials').status(400)

    return res.send(user.Token())
});

router.post('/jwtAdmin', async(req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0].message).status(400)

    let admin = await Admin.findOne({ phoneNumber: req.body.phoneNumber })
    if (!admin) return res.send('Invalid credentials').status(400)

    const validPassword = await bcrypt.compare(req.body.password, admin.password)
    if (!validPassword) return res.send('Invalid credentials').status(400)

    return res.send(admin.Token())
});



function validate(req) {
    const schema = {
        phoneNumber: Joi.string().max(255).min(3).required(),
        password: Joi.string().max(255).min(3).required()
    }
    return Joi.validate(req, schema)
}
module.exports = router;
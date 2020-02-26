const express = require('express')
var router = express.Router()
const admin = require('../middlewares/admin')
const { Loss, validate } = require('../models/loss.model')


router.post('/', async(req, res) => {

    try {
        let error = validator(req.body)
        if (error) res.send(error).status(400)
        let loss = new Loss();

        let cardCategory = await User.findOne({ category_id: req.body.category_id })
        if (!cardCategory) return res.send('category not found').status(400)

        user = new User(_.pick(req.body, ['cardId', 'category_id', 'placeOfLost', 'timeOfLost', 'description']))
        await user.save();
        return res.send(_.pick(user, ['name', 'email', 'phoneNumber', 'regDate'])).status(201)
    } catch (err) {
        res.send(err)
    }
})

router.get('/', async(req, res) => {
    try {
        let loss = await Loss.find();
        return res.send(users)
    } catch (err) {
        res.send(err)
    }
    Loss.find()
        .then(prod => res.send(prod).status(201))
        .catch(err => res.send(err).status(404))
})

module.exports = router;
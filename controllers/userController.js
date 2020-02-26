const hashPassword = require('../utils/hash')
const _ = require('lodash')
const express = require('express')
const { User, validate } = require('../models/user.model')
var router = express.Router();
const bcrypt = require('bcrypt')


router.get("/", async (req,res)=>{
    let users = await User.find();
    return res.send(users)
})

router.post('/', async(req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({ phoneNumber: req.body.phoneNumber, email: req.email })
    if (user) return res.send('User already registered').status(400)

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'phoneNumber', 'gender']))
    const harshed = await hashPassword(user.password)
    user.regDate = new Date().toString().replace(/\..+/, '')
    user.password = harshed;
    await user.save();
    return res.send(_.pick(user, ['name', 'email', 'phoneNumber', 'gender', 'regDate'])).status(200)
});


// login
router.post('/login', async function(req, res) {
    try {
        let user = await User.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if (user == "") return res.send('Authentication failed. user not found.');

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(validPassword)
        if (!validPassword) {
            return res.send('Wrong credentials').status(400)
        }

        return res.send(user.Token());

    } catch (err) {
        res.status(404).send("Error occured")
        console.log(err)
    }
});


module.exports = router;
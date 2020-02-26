const hashPassword = require('../utils/hash')
const _ = require('lodash')
const express = require('express')
const { Admin, validateAdmin } = require('../models/admin.model')
const { User, validate } = require('../models/user.model')
var router = express.Router();
const bcrypt = require('bcrypt')


router.get('/admins', async(req, res) => {
    const admins = await admin.find().sort({ name: 1 });
    return res.send(admins)
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0].message).status(400)

    let admin = await Admin.findOne({ phoneNumber: req.body.phoneNumber, email: req.body.email })
    if (admin) return res.send('admin already registered').status(400)

    admin = new Admin(_.pick(req.body, ['name', 'email', 'password', 'phoneNumber', 'gender']))
    const harshed = await hashPassword(admin.password)
    admin.regDate = new Date().toString().replace(/\..+/, '')
    admin.password = harshed;
    await admin.save();
    return res.send(_.pick(admin, ['name', 'email', 'phoneNumber', 'gender', 'regDate'])).status(201)
});

router.get('/non-admin', (req, res) => {
    User.find({ isAdmin: false })
        .then(user => res.send(user))
        .catch(err => res.send(err).status(404));
});


router.delete('/:id', (req, res) => {
    admin.findByIdAndRemove(req.params.id)
        .then(admin => res.send(admin))
        .catch(err => res.send(err).status(404));
})



// login
router.post('/login', async function(req, res) {
    try {
        let admin = await admin.findOne({
            phoneNumber: req.body.phoneNumber
        })
        if (admin == "") return res.send('Authentication failed. admin not found.');

        const validPassword = await bcrypt.compare(req.body.password, admin.password)
        console.log(validPassword)
        if (!validPassword) {
            return res.send('Wrong credentials').status(400)
        }

        return res.send(admin.Token());

    } catch (err) {
        res.status(404).send("Error occured")
        console.log(err)
    }
});


module.exports = router;
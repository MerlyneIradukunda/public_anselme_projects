const express = require("express")
const _ = require("lodash")
const multer = require("multer")

const { SeenCard, validator } = require('../models/seen.model');
const { Category } = require("../models/category.model")
const { Loss } = require("../models/loss.model")
const Notification = require("../models/notifications.model")

const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/seen_cards/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage });


router.get('/:id', async (req, res) => {
    try {
        let seen = await SeenCard.findById(req.params.id);

        if (seen) res.send(seen)
        else res.send("Failed to load all seen Cards").status(404)
    } catch (error) {
        res.send(error)
    }
});

router.get('/', async (req, res) => {
    try {
        let seens = await SeenCard.find();

        if (seens) res.send(seens)
        else res.send("Failed to load all seen Cards").status(404)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', upload.any(), async (req, res) => {
    try {
        
        let error = validator(req.body)
        if(error) res.send(error).status(400)

        let category = await Category.findOne({ _id: req.body.category_id })
        if (!category) return res.send("Category Not Found ... ").status(404)

        if(!req.files[0])
            req.body.card_pic = "no-image.jpg"
        else
            req.body.card_pic = await req.files[0].filename 

        let seens = new SeenCard(_.pick(req.body, ['names', 'email', 'phone', 'card_pic', 'address', 'card_no', 'category_id', 'found_at', 'found_on', 'how_can_be_found']))
        let newSeen = await seens.save();

        let lostcard = await Loss.find({$or:[
            {category_id: newSeen.category_id},
            {cardId: newSeen.card_no}
        ]})

        if(lostcard) sendNotification(lostcard.user_id,newSeen._id);
        

        if (newSeen) res.send(newSeen)
        else res.send("Failed to load all seen Cards")
    } catch (error) {
        res.send(error)
    }

})

router.put('/', async (req, res) => {
    try {
        let seencard = await SeenCard.findByIdAndUpdate(req.body.id, req.body, { new: true })
        if (seencard) res.send(seencard)
        else res.send("Failed to update the Card ...")
    } catch (error) {
        res.send(error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let seenCard = await SeenCard.findByIdAndDelete(req.params.id);

        if (seenCard) res.send(seenCard)
        else res.send("Failed to delete the Card")

    } catch (error) {
        res.send(error)
    }
})

async function sendNotification(user_id,seen_id)
{
    let notify = new Notification({
        seen_id: seen_id,
        user_id: user_id
    })
    await notify.save();
}


module.exports = router
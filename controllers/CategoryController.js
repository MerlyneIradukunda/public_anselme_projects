const express = require('express')
const { Category, validator } = require('../models/category.model');

var router = express.Router()

router.get("/", async (req, res) => {
    try {
        let categories = await Category.find();
        if (categories) res.send(categories)
        else res.send("Failed to find the Categories ....")
    } catch (error) {
        console.log(error)
    }
})

router.get('/byname/:name', async (req, res) => {
    try {
        let category = await Category.find({ name: req.params.name })

        if (category) res.send(category)
        else res.send("Failed to ge the category ..")

    } catch (error) {
        res.send(error)
    }
})
router.get('/:id', async (req, res) => {
    try {
        let category = await Category.findById(req.params.id)

        if (category) res.send(category)
        else res.send("Failed to ge the category ..")

    } catch (error) {
        res.send(error)
    }
})
router.post("/", async (req, res) => {
    try {
        let error = validator(req.body);
        if (error) return res.send(error.details[0].message).status(400)

        let cat = await Category.findOne({ name: req.body.name })
        if (cat) return res.send("This category is already registered ....");

        else {
            let category = new Category({
                name: req.body.name
            })

            let newcategory = await category.save();

            if (newcategory) return res.send(newcategory)
            else res.send("Failed to create new Category ")
        }
    } catch (error) {
        console.log(error)
    }
})


router.put("/", async (req, res) => {
    try {
        let cat = await Category.findOne({ name: req.body.name })
        if (cat) res.send("This category is already registered ....");

        let category = await Category.findByIdAndUpdate(req.body.id, req.body, { new: true })
        if (category) res.send(category)
        else res.send("Failed to update the Category ...")
    } catch (error) {
        res.send(error)
    }

})
router.delete("/:id", async (req, res) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.id);

        if (category) res.send(category)
        else res.send("Failed to delete the user")

    } catch (error) {
        res.send(error)
    }
})



module.exports = router
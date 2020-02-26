require("./models/mongodb");
const express = require("express")
const config = require('config')

const app = express()

const CategoryController = require("./controllers/CategoryController")
const SeenController = require("./controllers/SeenController")
const lossController = require('./controllers/lossControllers')
const userController = require('./controllers/userController')
const auth = require('./controllers/auth')
const admin = require('./controllers/adminController')

const authMiddleware = require('./middlewares/auth')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","DELETE, POST, PUT, GET, UPDATE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
    next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!config.get("jwtPrivatekey")) {
    console.log('JWT PRIVATE KEY IS NOT DEFINED');
    process.exit(1)
}

app.get('/', (req, res) => res.send("Welcome to Yange app"))

app.use('/api/categories', CategoryController)

app.use('/api/seen', SeenController)

app.use('/api/users', userController)

app.use('/api/auth', auth)

app.use('/api/admin', admin)

app.use('/api/loss', authMiddleware, lossController)


const port = process.env.PORT || 4002

app.listen(port, () => console.log(`Server running on port ${port}`))
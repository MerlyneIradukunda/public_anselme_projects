const mongoose = require('mongoose')

try {
    let connectio = mongoose.connect('mongodb+srv://anselme:123@cluster0-gu14c.mongodb.net/yange-app', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    if(connectio)
        console.log('connected to mongodb successfully....')
    else
        console.log('failed to connect to mongodb', error);
} catch (error) {
    console.log(error)
}

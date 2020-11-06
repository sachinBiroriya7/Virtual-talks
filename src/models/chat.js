const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    message:{
        type:String,
        require: true
    },
    nickname:{
        type:String,
        require:true
    },
    dateSend:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('chat', ChatSchema)
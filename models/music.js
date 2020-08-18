const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Music', musicSchema)
const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    instrument: {
        type: String,
        required: true,
    },
    joined: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    memberImage: {
        type: Buffer,
        required: true
    },
    memberImageType: {
        type: String,
        required: true
    }
})

memberSchema.virtual('memberImagePath').get(function() {
  if (this.memberImage != null && this.memberImageType != null) {
    return `data:${this.memberImageType};charset=utf-8;base64,${this.memberImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Member', memberSchema)
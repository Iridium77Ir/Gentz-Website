const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    Image: {
        type: Buffer,
        required: true
    },
    ImageType: {
        type: String,
        required: true
    }
})

imageSchema.virtual('ImagePath').get(function() {
  if (this.Image != null && this.ImageType != null) {
    return `data:${this.ImageType};charset=utf-8;base64,${this.Image.toString('base64')}`
  }
})

module.exports = mongoose.model('Image', imageSchema)
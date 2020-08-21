const express = require('express')
const router = express.Router()
const Image = require('../../models/images')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//Get all image
router.get("/", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let images
    try {
        images = await Image.find()
        res.render("images/index", {
            images: images
        })
    } catch (err) {
        res.redirect("/")
    }
})
// New Image
router.get("/new", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    res.render("images/new", {
      image: new Image
    })
})
// New image post
router.post("/new", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    var img = req.body.image
    for (var i =0; i < img.length; i++) {
      var image = new Image({
      })
      saveImage(image, img[i])
    
      try {
        const newImage = await image.save()
      } catch (err) {
        console.log(err)
        res.render("images/new", {
            image: new Image,
            errorMessage: "Failed to create a new Image"
        })
      }

    }
    res.redirect("/cp/images")
})
// Show Image Route
router.get('/search/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    try {
      const image = await Image.findById(req.params.id)
                             .populate('image')
                             .exec()
      res.render('images/show', { image: image })
    } catch {
      res.redirect('/')
    }
})
 
// Delete Image Page
router.delete('/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let image
    try {
      image = await Image.findById(req.params.id)
      await image.remove()
      res.redirect('/cp/images')
    } catch {
      if (image != null) {
        res.render('images/show', {
          image: image,
          errorMessage: 'Could not remove image'
        })
      } else {
        res.redirect('/')
      }
    }
})

function checkCookie(req) {
  if (req.cookies.loggedin == "true") {
      return true
  } else {
      return false
  }
}

function saveImage(image, imageEncoded) {
    if (imageEncoded == null) return
    const _image = JSON.parse(imageEncoded)
    if (image != null && imageMimeTypes.includes(_image.type)) {
      image.Image = new Buffer.from(_image.data, 'base64')
      image.ImageType = _image.type
    }
}

module.exports = router
const express = require('express')
const router = express.Router()
const Member = require('../../models/members')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//Get all member
router.get("/", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let members
    try {
        members = await Member.find()
        res.render("members/index", {
            members: members
        })
    } catch (err) {
        res.redirect("/")
    }
})
// New Member
router.get("/new", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    res.render("members/new", {
      member: new Member
    })
})
// New member post
router.post("/new", async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    var member = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        instrument: req.body.instrument,
        joined: new Date(req.body.joined),
        description: req.body.description
      })
      saveImage(member, req.body.image)
    
      try {
        const newMember = await member.save()
        res.redirect(`/cp/members/search/${newMember.id}`)
      } catch (err) {
        console.log(err)
        res.render("members/new", {
            member: new Member,
            errorMessage: "Failed to create a new Member"
        })
      }
})
// Show Member Route
router.get('/search/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    try {
      const member = await Member.findById(req.params.id)
                             .populate('member')
                             .exec()
      res.render('members/show', { member: member })
    } catch {
      res.redirect('/')
    }
})
  
// Edit Member Route
router.get('/:id/edit', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    try {
      const member = await Member.findById(req.params.id)
      res.render("members/edit", {
          member: member
      })
    } catch {
      res.redirect('/')
    }
})
  
// Update Member Route
router.put('/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let member
  
    try {
      member = await Member.findById(req.params.id)
      member.firstName = req.body.firstName
      member.lastName = req.body.lastName
      member.joined = new Date(req.body.joined)
      member.instrument = req.body.instrument
      member.description = req.body.description
      if (req.body.image != null && req.body.image !== '') {
        saveImage(member, req.body.image)
      }
      await member.save()
      res.redirect(`/cp/members/search/${member.id}`)
    } catch {
      if (member != null) {
        res.render("members/edit", {
            errorMessage: "Failed to edit Member"
        })
      } else {
        redirect('/')
      }
    }
})
  
// Delete member Page
router.delete('/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let member
    try {
      member = await Member.findById(req.params.id)
      await member.remove()
      res.redirect('/cp/members')
    } catch {
      if (member != null) {
        res.render('members/show', {
          member: member,
          errorMessage: 'Could not remove member'
        })
      } else {
        res.redirect('/')
      }
    }
})

function checkCookie(req) {
  if (req.signedCookies['loggedin'] == "true") {
      return true
  } else {
      return false
  }
}
function saveImage(member, imageEncoded) {
    if (imageEncoded == null) return
    const image = JSON.parse(imageEncoded)
    if (member != null && imageMimeTypes.includes(image.type)) {
      member.memberImage = new Buffer.from(image.data, 'base64')
      member.memberImageType = image.type
    }
}

module.exports = router
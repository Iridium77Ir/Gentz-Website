const express = require('express')
const router = express.Router()
const fs = require("fs")

//GET - SHOW the contact text
router.get("/", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    var text = fs.readFileSync(__dirname + "/contact.md")
    try {
        res.render("contact/index", {
            text: text
        })
    } catch (err) {
        res.redirect("/")
    }
})
// Edit Route
router.get('/edit', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    var text = fs.readFileSync(__dirname + "/contact.md")
    try {
      res.render("contact/edit", {
          text: text
      })
    } catch (e) {
      res.redirect('/')
    }
})
  
// Update Route
router.put('/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    var text = req.body.text
    try {
        fs.writeFileSync(__dirname + "/contact.md", text)
        res.render("contact/index", {
            text: text
        })
    } catch (e) {
        res.redirect('/')
    }
})

function checkCookie(req) {
    if (req.signedCookies['loggedin'] == "true") {
        return true
    } else {
        return false
    }
}

module.exports = router
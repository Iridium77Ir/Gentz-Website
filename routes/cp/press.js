const express = require('express')
const router = express.Router()
const fs = require("fs")

//GET - SHOW the press text
router.get("/", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    var text = fs.readFileSync(__dirname + "/press.md")
    try {
        res.render("press/index", {
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
    var text = fs.readFileSync(__dirname + "/press.md")
    try {
      res.render("press/edit", {
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
        fs.writeFileSync(__dirname + "/press.md", text)
        res.render("press/index", {
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
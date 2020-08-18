const express = require('express')
const router = express.Router()
const Music = require('../../models/music')

//GET - SHOW all
router.get("/", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    let music
    try {
        music = await Music.find()
        res.render("music/index", {
            musics: music
        })
    } catch (err) {
        res.redirect("/")
    }
})
//GET - NEW Page
router.get("/new", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    res.render("music/new", {
        music: new Music
      })
})
//POST - New Page
router.post("/new", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    var li = req.body.link
    var splitli = li.split("watch?v=")
    var link = splitli.join("embed/")
    var music = new Music({
        Title: req.body.Title,
        link: link
    })
    try {
        const newMusic = await music.save()
        res.redirect(`/cp/music`)
    } catch (err) {
        console.log(err)
        res.render("music/new", {
            member: new Music,
            errorMessage: "Failed to create a new Music"
        })
    }

})
// DELETE - Delete music
router.delete('/:id', async (req, res) => {
    if (checkCookie(req) == false) {
      res.redirect("/")
    }
    let music
    try {
      music = await Music.findById(req.params.id)
      await music.remove()
      res.redirect('/cp/music')
    } catch {
      if (music != null) {
        res.render('music/index', {
          errorMessage: 'Could not remove member'
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

module.exports = router
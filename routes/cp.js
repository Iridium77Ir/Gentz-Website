const express = require('express')
const router = express.Router()
require('dotenv').config()

const memberRouter = require('./cp/member')
router.use('/members', memberRouter)
const musicRouter = require('./cp/music')
router.use('/music', musicRouter)
const imageRouter = require('./cp/images')
router.use('/images', imageRouter)
const pressRouter = require('./cp/press')
router.use('/press', pressRouter)
const contactRouter = require('./cp/contact')
router.use('/contact', contactRouter)
const introRouter = require('./cp/intro')
router.use('/intro', introRouter)
const introImagesRouter = require('./cp/introImages')
router.use('/introImages', introImagesRouter)

router.get("/", async (req, res) => {
    var cook = checkCookie(req)
    if (cook == true) {
        res.redirect("/cp/admin")
    } else {
        res.render("cp/index")
    }
    
})
router.post("/", async (req, res) => {
    var login = process.env.ADMIN_USER
    var password = process.env.ADMIN_PASS
    if (req.body.login === login) {
        if (req.body.password === password) {

            var options = {
                httpOnly: true,
                signed: true
            }
            res.cookie("loggedin", true, options)
            res.redirect("cp/admin")

        } else {
            res.render("cp/index", {
                errorMessage: "Wrong username or password"
            })
        }
    } else {
        res.render("cp/index", {
            errorMessage: "Wrong username or password"
        })
    }
})

router.get("/admin", async (req, res) => {
    if (checkCookie(req) == false) {
        res.redirect("/")
    }
    res.render("cp/choice")
})

router.get("/removecookie", async (req, res) => {
    res.clearCookie("loggedin")
    res.redirect("/cp")
})

function checkCookie(req) {
    if (req.signedCookies['loggedin'] == "true") {
        return true
    } else {
        return false
    }
}

module.exports = router
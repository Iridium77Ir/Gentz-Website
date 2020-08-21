const express = require('express')
const router = express.Router()
const fs = require("fs")
const Music = require('../models/music')
const Member = require('../models/members')
const Image = require('../models/images')
const introImages = require("../models/introImages")

router.get("/", async (req, res) => {
    var text = fs.readFileSync(__dirname + "/cp/press.md")
    var contact = fs.readFileSync(__dirname + "/cp/contact.md")
    var intro = fs.readFileSync(__dirname + "/cp/intro.md")
    music = await Music.find()
    members = await Member.find()
    images = await Image.find()
    introImage = await introImages.find()
    res.render("index", {
        intro: intro,
        text: text,
        musics: music,
        members: members,
        introimages: introImage,
        images: images,
        contact: contact
    })
})

module.exports = router
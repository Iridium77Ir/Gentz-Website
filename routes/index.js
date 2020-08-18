const express = require('express')
const router = express.Router()
const fs = require("fs")
const Music = require('../models/music')
const Member = require('../models/members')
const Image = require('../models/images')

router.get("/", async (req, res) => {
    var text = fs.readFileSync(__dirname + "/cp/press.md")
    music = await Music.find()
    members = await Member.find()
    images = await Image.find()
    res.render("index", {
        text: text,
        musics: music,
        members: members,
        images: images
    })
})

module.exports = router
const express = require("express");
const router = express.Router();
const database = require("../mongoDB");
const path = require("path");

//--------------------HTML-------------------------------
router.get("/:channel", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/chat", "index.html"));
});

//--------------------GET-MESSAGES-----------------------
router.get("/get/:channel", async (req, res) => {
    if (req.params.channel == "*") {
        const channels = await database.getChannels();
        res.send(channels);
    }
    else {
        const messages = await database.getMessages(req.params.channel);
        if (messages) {
            res.send(messages);
        }
        else {
            res.send("Channel doesn't exist");
        }
    }
});

//--------------------POST-MESSAGE-----------------------
router.post("/post/message/:channel", async (req, res) => {
    const message = req.body;
    const err = await database.addMessage(message, req.params.channel);
    if (err) {
        res.status(400).send("Message wasn't send due to an error");
    }
    res.end();
});

//--------------------ADD-CHANNEL------------------------
router.post("/post", async (req, res) => {
    const channel = req.body.name;
    await database.addChannel(channel);
    res.end();
});

module.exports = router;
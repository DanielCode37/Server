const express = require("express");
const router = express.Router();
const database = require("../mongoDB");
const path = require("path");

//--------------------HTML-------------------------------
router.get("/:channel", (req, res) => {
    console.log(req.params);
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//--------------------GET-MESSAGES-----------------------
router.get("/get/messages", async (req, res) => {
    const messages = await database.getMessages();
    res.send(messages);
});

//--------------------POST-MESSAGE-----------------------
router.post("/", async (req, res) => {
    const message = req.body;
    const err = await database.addMessage(message);
    if (err) {
        res.status(400).send("Message wasn't send due to an error");
    }
    res.end();
});

module.exports = router;
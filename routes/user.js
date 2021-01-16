const router = require("express").Router();
const database = require("../mongoDB");

router.get("/users/:user", (req, res) => {
    res.sendFile("../public/user.html");
});

router.get("./get/users/:user", (req, res) => {
    const user = database.getUsers(req.params.user);
    res.send(user);
});

module.exports = router;
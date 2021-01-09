const router = require("express").Router();
const database = require("../mongoDB");
const validation = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const config = require("../config.json");

//--------------------REGISTER-------------------------------
router.post("/register", async (req, res) => {
	const { error } = validation.registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const err = await database.addUser(req.body.name, req.body.username, req.body.password);
	res.send(err);
});


//--------------------LOGIN----------------------------------
router.post("/login", async (req, res) => {
	const { error } = await validation.loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// check if username exists
	const user = await database.getUsers(req.body.username);
	if (user == {}) {
		return res.status(400).send(`Username "${req.body.username}" doesn't exist!`);
	}

	// check if passwort is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) {
		return res.status(400).send("Invalid password!");
	}

	console.log(process.env.TOKEN_SECRET);
	// create and assign jwt
	const token = jwt.sign({ _id: user._id }, config.TOKEN_SECRET);
	res.header("auth-token", token);

	res.status(200).send("Logged in!");
});

router.get("/register", (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "auth", "register.html"));
});

router.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "auth", "login.html"));
});

module.exports = router;
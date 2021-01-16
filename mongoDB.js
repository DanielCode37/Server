const { MongoClient } = require('mongodb');
const config = require("./config.json");
const bcyrpt = require("bcrypt");
const database = {};
const client = new MongoClient(config.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err) {
			throw `Failed to connect to the database. ${err.stack}`;
		}
	});


//--------------------GET-USERS-------------------------------
database.getUsers = async (username) => {
	try {
		await client.connect();
		console.log("getting users...");
		// Use the collection "users"
		const col = await client.db("Users").collection("users");
		// Find documents
		const users = await col.find().toArray();
		// return collection or users
		if (username) {
			return await col.findOne({ username: username });
		}
		return users;
	} catch (error) {
		throw error;
	}
}

//--------------------ADD-USER--------------------------------
database.addUser = async (user) => {
	try {
		await client.connect();
		console.log("adding User...");
		// Use the collection "people"
		const col = client.db("Users").collection("users");

		// check if username already exits
		const usernameExists = await col.findOne({ username: user.username });
		console.log(usernameExists);
		if (usernameExists) {
			return `Username "${user.username}" already exists`;
		}

		// hash password
		const salt = await bcyrpt.genSalt(10);
		const password = await bcyrpt.hash(user.password, salt);

		// Construct a user 
		user.date = new Date();
		user.password = password;

		// Insert a single user
		await col.insertOne(user);

	} catch (err) {
		throw err;
	}
}

//--------------------GET-MESSAGES----------------------------
database.getMessages = async (collection) => {
	try {
		await client.connect();
		console.log("getting messages...");
		// Use the collection "users"
		const col = client.db("Messages").collection(collection);
		// Find documents
		const messages = await col.find().toArray();
		// return collection or users
		return messages;

	} catch (error) {
		throw error;
	}
}

//--------------------ADD-MESSAGE-----------------------------
database.addMessage = async (message, collection) => {
	try {
		await client.connect();
		console.log("adding message...");
		// Use the collection "users"
		const col = client.db("Messages").collection(collection);
		// insert message
		await col.insertOne(message);

	} catch (error) {
		throw error;
	}
}


//--------------------GET-CHANNEL-----------------------------
database.getChannels = async () => {
	try {
		await client.connect();
		console.log("getting channels...");
		const collections = [];
		for (let collection of await client.db("Messages").listCollections().toArray()) {
			collections.push(collection.name);
		}
		return collections;
	} catch (error) {
		throw error;
	}
}

//--------------------ADD-CHANNEL-----------------------------
database.addChannel = async (channel) => {
	try {
		await client.connect();
		console.log("adding channel...");
		// get database
		const db = client.db("Messages");
		// insert channel into database
		db.createCollection(channel);
	} catch (error) {
		throw error;
	}
}

module.exports = database;
const { MongoClient } = require('mongodb');
const config = require("./config.json");
const client = new MongoClient(config.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
const bcyrpt = require("bcrypt");

const database = {};

//--------------------GET-USERS-------------------------------
database.getUsers = async (username) => {
	try {
		await client.connect();
		console.log("getting users...");
		// Use the collection "users"
		const col = client.db("Users").collection("users");
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

	finally {
		await client.close();
	}
}

//--------------------ADD-USER--------------------------------
database.addUser = async (name, username, password) => {
	try {
		await client.connect();
		console.log("adding User...");
		// Use the collection "people"
		const col = client.db("Users").collection("users");

		// check if username already exits
		const usernameExits = await col.findOne({ username: username });
		if (usernameExits) {
			return `Username "${username}" already exists`;
		}
		// hash password
		const salt = await bcyrpt.genSalt(10);
		password = await bcyrpt.hash(password, salt);

		// Construct a user                                                                                                                                                 
		const user = {
			"name": name,
			"username": username,
			"password": password,
			"date": new Date()
		}
		// Insert a single user
		await col.insertOne(user);

	} catch (err) {
		throw err;
	}

	finally {
		await client.close();
	}
}

//--------------------GET-MESSAGES----------------------------
database.getMessages = async () => {
	try {
		await client.connect();
		console.log("getting messages...");
		// Use the collection "users"
		const col = client.db("Messages").collection("messages");
		// Find documents
		const messages = await col.find().toArray();
		// return collection or users
		return messages;

	} catch (error) {
		throw error;
	}

	finally {
		await client.close();
	}
}

//--------------------ADD-MESSAGE-----------------------------
database.addMessage = async (message) => {
	try {
		await client.connect();
		console.log("adding message...");
		// Use the collection "users"
		const col = client.db("Messages").collection("messages");
		// insert message
		await col.insertOne(message);

	} catch (error) {
		throw error;
	}

	finally {
		await client.close();
	}
}


//--------------------GET-CHANNEL-----------------------------
database.getChannels = async (channel) => {
	try {
		await client.connect();
		console.log("getting channels...");
		const db = client.db("Messages");
		//return hole collection
		if (channel) {
			return db.collection(channel);
		}
		return db;
	} catch (error) {
		throw error;
	}

	finally {
		await client.close();
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
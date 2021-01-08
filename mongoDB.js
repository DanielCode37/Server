const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://server:npS46NhdVZk6D2Sy@cluster0.hji1t.mongodb.net/Users?retryWrites=true&w=majority";
const client = new MongoClient(/* process.env.DB_CONNECT */ uri, { useNewUrlParser: true, useUnifiedTopology: true });
const bcyrpt = require("bcrypt");

const database = {};

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
        console.error(error.stack);
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
        const col = await client.db("Users").collection("users");

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
        const col = await client.db("Messages").collection("messages");
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
        const col = await client.db("Messages").collection("messages");
        // insert message
        await col.insertOne(message);

    } catch (error) {
        throw error;
    }

    finally {
        await client.close();
    }
}

module.exports = database;
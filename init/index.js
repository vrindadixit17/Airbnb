const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main(params) {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("data was initialised")
}

main()
    .then(() => {
        console.log("connected to db");
        // Call the initialization function after a successful connection
        return initDB();
    })
    .then(() => {
        console.log("Database initialization complete!");
    })
    .catch((err) => {
        console.log("An error occurred:");
        console.log(err);
    });
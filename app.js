const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js")

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

app.get("/", (req, res) => {
    res.send("im root");
})

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "my house",
        description: "by the suburbs",
        price: 12000,
        location: "goa",
        country: "india",
    })
    await sampleListing.save();
    console.log("sample saved");
    res.send("successful");
})

app.listen(8080, () => {
    console.log("server is listening to port 8080");
})
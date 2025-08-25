const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB");
        app.listen(8080, () => {
            console.log("Server is listening to port 8080");
        });
    })
    .catch((err) => {
        console.log("Error connecting to DB:");
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("I'm root");
});

app.get("/listing", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings: allListings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).send("Error fetching listings.");
    }
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});



// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my house",
//         description: "by the suburbs",
//         price: 12000,
//         location: "goa",
//         country: "india",
//     })
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("successful");
// })
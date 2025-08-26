const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");  // Capitalized model
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

// index route
app.get("/listing", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

// show route
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params; // ✅ fixed
    const foundListing = await Listing.findById(id);
    res.render("listings/show", { listing: foundListing }); // ✅ send response
});


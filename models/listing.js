const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://unsplash.com/photos/a-house-with-a-blue-front-door-and-a-brown-front-door-xaqsFfoEq3o" 
        : v,
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing", listingSchema);
modules.export = Listing;
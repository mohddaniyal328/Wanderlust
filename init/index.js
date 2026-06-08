const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://username:Wanderlust123@cluster0.970bv3p.mongodb.net/?retryWrites=true&w=majority";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // Clears any existing data

  // Map through the data to add an owner to every sample listing
  // Replace the ID below with your actual User ID from MongoDB
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "6a26122d2723f2e7f38db98b",
  }));

  await Listing.insertMany(updatedData);
  console.log("data was initialized");
};

initDB();
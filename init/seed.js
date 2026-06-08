require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.DB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  // Create a default user
  let user = await User.findOne({ username: "admin" });
  if (!user) {
    user = new User({ email: "admin@wanderlust.com", username: "admin" });
    user = await User.register(user, "admin123");
    console.log("User created: admin / admin123");
  } else {
    console.log("User already exists: admin");
  }

  // Seed listings
  await Listing.deleteMany({});
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));
  await Listing.insertMany(updatedData);
  console.log(`${updatedData.length} listings seeded!`);

  await mongoose.disconnect();
  console.log("Done!");
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

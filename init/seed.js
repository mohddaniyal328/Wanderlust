require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.DB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  // Delete admin user
  await User.deleteMany({ username: "admin" });
  console.log("Deleted admin user");

  // Create 5 new users
  const users = [];
  for (const name of ["demo", "demo2", "demo3", "alice", "bob"]) {
    let user = new User({ email: `${name}@wanderlust.com`, username: name });
    user = await User.register(user, "741");
    users.push(user);
    console.log(`Created user: ${name}`);
  }

  // Delete old listings
  await Listing.deleteMany({});

  // Distribute listings evenly across all users
  const updatedData = initData.data.map((obj, i) => ({
    ...obj,
    owner: users[i % users.length]._id,
  }));
  await Listing.insertMany(updatedData);
  console.log(`${updatedData.length} listings seeded across ${users.length} users`);

  await mongoose.disconnect();
  console.log("Done!");
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

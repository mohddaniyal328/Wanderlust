const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let passportLocalMongoose = require("passport-local-mongoose");

// If it's an object (due to ES Module export), get the .default function
if (typeof passportLocalMongoose !== 'function') {
    passportLocalMongoose = passportLocalMongoose.default;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    wishlists: [
        {
            type: Schema.Types.ObjectId,
            ref: "Listing"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
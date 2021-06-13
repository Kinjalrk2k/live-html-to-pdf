const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  picture: String,
  uid: String,
  email: String,
});

module.exports = User = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  email: String,
  password: String,
});
const AuthModel = mongoose.model("user", authSchema);
//
module.exports = { AuthModel };

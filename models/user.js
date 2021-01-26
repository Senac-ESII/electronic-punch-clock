const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  id: String,
  name: String,
  password: String,
  email: String,
  role: String,
});

module.exports = model("User", userSchema);

const { model, Schema } = require("mongoose");
/**
 * a schema that defines fields of Users table in the database
 */
const userSchema = new Schema({
  id: String,
  name: String,
  password: String,
  email: String,
  role: String,
});

module.exports = model("User", userSchema);

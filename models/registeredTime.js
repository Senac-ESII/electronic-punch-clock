const { model, Schema } = require("mongoose");

const RegisteredTimeSchema = new Schema({
  userId: Number,
  timeRegistered: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("RegisteredTime", RegisteredTimeSchema);

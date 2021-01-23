const { model, Schema } = require("mongoose");

const ClockSchema = new Schema({
  userId: String,
  timeRegistered: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Clock", ClockSchema);

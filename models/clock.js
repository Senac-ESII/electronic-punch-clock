const { model, Schema } = require("mongoose");
/**
 * a schema that defines fields of Clocks table in the database
 */
const ClockSchema = new Schema({
  userId: String,
  timeRegistered: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Clock", ClockSchema);

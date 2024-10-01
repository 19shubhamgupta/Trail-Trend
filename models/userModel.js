const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  email: String,
  orders: {
    type: Array,
    default: [],
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  price: { type: Number, required: true },
  ratings: { type: Number },
});

const Items = mongoose.model("Items", itemSchema);
module.exports = Items;

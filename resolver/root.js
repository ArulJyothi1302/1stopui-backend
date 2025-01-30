const Items = require("../models/items");

const root = {
  items: async () => {
    try {
      return await Items.find();
    } catch (err) {
      console.error("Error fetching items:", err);
      throw new Error("Error fetching items");
    }
  },
  item: async ({ id }) => {
    try {
      return await Items.findById(id);
    } catch (err) {
      console.error("Error fetching item:", err);
      throw new Error("Error fetching item");
    }
  },
  addItem: async ({ name, img, price, ratings }) => {
    try {
      const newItem = new Items({ name, img, price, ratings });
      await newItem.save();
      return newItem;
    } catch (err) {
      console.error("Error adding item:", err);
      throw new Error("Error adding item");
    }
  },
};
module.exports = root;

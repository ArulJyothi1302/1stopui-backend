const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/items");

dotenv.config();

const items = [
  { name: "Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Chandelier", img: "URL", price: 200, ratings: 3 },
  { name: "Wall Light", img: "URL", price: 140, ratings: 4 },
  { name: "Light Wall Sconce", img: "URL", price: 290, ratings: 4 },
  { name: "Two Light Wall Sconce", img: "URL", price: 240, ratings: 4 },
  { name: "Portable Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Hugger Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Industrial Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Traditional Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Table Fan", img: "URL", price: 240, ratings: 4 },
  { name: "Flush Mount", img: "URL", price: 240, ratings: 4 },
  { name: "Track Lighting", img: "URL", price: 240, ratings: 4 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Item.deleteMany(); // Clear existing items
    await Item.insertMany(items);
    console.log("Database Seeded");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

seedDB();

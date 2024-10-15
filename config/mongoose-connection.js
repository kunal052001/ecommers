const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:db");

mongoose
  .connect(config.get("MONGODB_URI")) // Removed deprecated options
  .then(() => debug("Connected to MongoDB..."))
  .catch((err) => debug("Could not connect to MongoDB...", err));

module.exports = mongoose.connection;

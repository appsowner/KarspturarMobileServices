const mongoose = require("mongoose");

// connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB CONNECTED");
  } catch (err) {
    console.log("DB CONNECTION ERR", err);
    process.exit(1);
  }
};

module.exports = connectDB;

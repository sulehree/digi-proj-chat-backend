const mongoose = require("mongoose");
// for Compas Db.. use this  process.env.MONGO_URI_COMPAS;
// for Atlas DB.. use this   process.env.MONGO_URI_ATLAS.

ConnectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, //  Abbas
    })
    .then(() => {
      console.log(
        `MongoDB-Connected: ${mongoose.connection.host}`.magenta.bold
      );
    })
    .catch((err) => {
      console.log("err", err);
      process.exit();
    });
};

module.exports = ConnectDB;

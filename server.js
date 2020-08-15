const express = require("express");
const port = process.env.PORT || 6000;
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const event = require("events");

//const multer = require('multer');
//const fileUpload = require('express-fileupload');
const app = express();

//cors for node.js and reactjs connection
app.use(cors());

//default options
//app.use(fileUpload());

//morgan middleware
app.use(morgan("dev"));
app.use(express.json());

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1/RamroLuga_DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo not connected");
  });

app.use("/user", require("./routes/userRoutes"));
app.use("/images", require("./routes/imagesRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/product", require("./routes/productroute"));

/*change port*/
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

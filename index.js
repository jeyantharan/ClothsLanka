const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));


const userRoute = require("./Route/user");
const addressRoute = require("./Route/address");


app.use("/user", userRoute);
app.use("/address", addressRoute);

const uri = "mongodb+srv://codegalaxi:codegalaxi2023@codegalaxi.xuicqew.mongodb.net/ClothsLanka?retryWrites=true&w=majority&appName=AtlasApp";
const PORT = process.env.PORT || 8080;
let connection = mongoose.connect(uri);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection established");

      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
const express = require("express");
const cors=require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const productRoute = require("./routes/user.route.js");
const app = express();
app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb+srv://sandhanpiyush20:Piyush%4020@cluster0.i9sqb.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

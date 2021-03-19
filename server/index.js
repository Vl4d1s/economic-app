const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("I am a backend server");
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`server runnig on port ${port}`);
  }
});

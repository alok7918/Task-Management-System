require('dotenv').config(); // Load environment variables from .env file

var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.router');
const taskRouter = require("./routes/task.router");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/user", userRouter);
app.use("/task", taskRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
















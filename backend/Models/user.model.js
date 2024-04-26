//Require Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const UserSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true,"email is required"],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    maxlength: 10,
    minlength:5,
    trim: true
  },
  mobile: {
    type: String,
    required: [true,"Mobile is required"],
    maxlength: 10,
    minlength:10,
    trim: true
  },
  gender: {
    type: String,
    required: [true,"Gender is required"],
  },
  role: String,
  status: Number,
  info: String
});

// compile schema to model
module.exports = mongoose.model('user_collection',UserSchema);


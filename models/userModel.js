const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Simple validation for a 10-digit phone number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("Users", userSchema);
module.exports = User;

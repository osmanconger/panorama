const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    required: false,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  isLinkedinUser: {
    required: false,
    type: Boolean
  },
  linkedinId: {
    required: false,
    type: String
  }
});

module.exports = mongoose.model("Users", userSchema);

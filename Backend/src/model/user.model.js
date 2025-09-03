const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },

  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  // mobileNum: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
  // },
  password: {
    type:String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "seller"],
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

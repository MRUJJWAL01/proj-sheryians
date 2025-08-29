const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName: { f, lastname },
      password,
    } = req.body;
    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExist) {
      return res.status(422).json({
        message:
          isUserAlreadyExist.username == username
            ? "username already exist"
            : "email already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      fullName: {
        f,
        lastname,
      },
      password: hash,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);

    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullName,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email:user.email,
        fullName:user.fullName
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser
};

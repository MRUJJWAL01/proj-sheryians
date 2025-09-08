const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName: { firstName, lastName },
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
        firstName,
        lastName,
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
    console.log("user registered");
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
    console.log(error.message);
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
    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY,{
      expiresIn:"1h",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
    console.log("user logged in");
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};
const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {});
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};
const registerSeller = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName: { firstName, lastName },
      password,
    } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExist) {
      return res.status(422).json({
        msg:
          isUserAlreadyExist.username === username
            ? "username already exist"
            : "emain already exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const seller = await userModel.create({
      username,
      email,
      fullName: {
        firstName,
        lastName,
      },
      password: hash,
      role: "seller",
    });
    const token = jwt.sign({ id: seller._id }, process.env.SECRETKEY);
    res.cookie("token", token);
    res.status(201).json({
      msg: "seller Created successfully",
      seller: {
        id: seller._id,
        username: seller.username,
        email: seller.email,
        fullName: seller.fullName,
      },
    });
  } catch (error) {
    res.status(401).json({
      msg: error.message,
      error: error,
    });
    console.log(error);
  }
};

const sellerLogin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const seller = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!seller) {
      return res.status(401).json({
        msg: "invalid creadintial",
      });
    }
    const isPasswordValid = bcrypt.compare(seller.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "invalid creadintial",
      });
    }
    const token = jwt.sign({ id: seller._id }, process.env.SECRETKEY);
    res.cookie("token", token);
    res.status(201).json({
      msg: "seller logged in successfully",
      seller: {
        id: seller._id,
        email: seller.email,
        username: seller.username,
        fullName: seller.fullName,
        token: token,
        role: seller.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      msg: error.message,
      error: error,
    });
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  registerSeller,
  sellerLogin,
  getMe,
  logoutUser,
};

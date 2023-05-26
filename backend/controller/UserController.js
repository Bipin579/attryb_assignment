const UserModel = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
require("dotenv").config();

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return res.status(400).send({ message: "User already exists", success: false });
    }
    await UserModel.create({ name, email, password });
    res.status(201).send({ message: "User Registered Successfully", success: true });

  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Please provide the all fields!", success: false });
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ message: "User doesn't exists!", success: false });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Something went wrong!", success: false });
    }

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const user = UserModel.findById(req.user);

    return res.status(201).send({ user, success: true });

  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
}


const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    res.status(201).json({
      success: true,
      message: "Log out successful!"
    })
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
}

module.exports = { register, login, logout, getUser };

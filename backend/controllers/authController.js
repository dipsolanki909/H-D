const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const loginUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ name: username });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

// ✅ CREATE REGISTER

const createRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      address,
      pincode
    } = req.body;

    // 🔎 Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }
    
    // 🔎 Check if name already exists
    const existingName = await User.findOne({ name });

    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      address,
      pincode,
      isEmailVerified: true,
      isVerified: true,
    };

    const user = await User.create(newUserInfo);


    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully. You can now login.",
      user: userResponse
    });

  } catch (error) {
    next(error);
  }
};




const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required"
      });
    }

    const decoded = jwt.verify(refreshToken, "qweuansdasdg123123");

    const user = await User.findOne({
      _id: decoded.id
    });
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }


    const accessToken = generateAccessToken(user);

    res.json({
      success: true,
      accessToken
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

module.exports = {
  createRegister,
  loginUser,
  refreshToken
};
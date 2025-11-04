import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// 🟢 LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.json({ success: false, message: "Invalid password!" });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User logged in successfully!",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// 🟢 REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res.json({ success: false, message: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format!" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// 🟢 ADMIN LOGIN (optional)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      return res.json({ success: true, token, message: "Admin login success" });
    } else {
      return res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };

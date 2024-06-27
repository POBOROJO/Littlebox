import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Register = async (req) => {
  try {
    const { name, username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return Response.status(400).json({
        success: false,
        message: "User already registered !",
      });
    }
    const newUser = new User({
      name,
      username,
      password,
    });
    await newUser.save();

    Response.status(200).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (err) {
    console.log(err);
    Response.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }
};

export const Login = async (req) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return Response.status(401).json({
        message: "User not found!",
        success: false,
      });
    }

    if (user.password !== password) {
      return Response.status(401).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    Response.status(200).json({
      message: "Login successful !",
      token: token,
    });
  } catch (err) {
    console.log(err);
    Response.json({
      success: false,
      message: "Internal server error",
    });
  }
};

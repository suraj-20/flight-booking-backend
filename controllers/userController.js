const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const createTokenForUser = require("../services/authentication");

module.exports.userRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      address,
    } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone_number,
      address,
    });

    res.status(201).json({ message: "User registered sucessfull", user });
  } catch (error) {
    console.log("Error in user registeration", error);
    res.status(400).json({ message: "Error in user register", error });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found!");
    }

    if (!user.password) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json("Invalid Password");
    }

    const token = createTokenForUser.createToken(user);
    // console.log("Token in user login", token);

    res
      .status(200)
      .json({ message: "User logged in sucessfully", user, token });
  } catch (error) {
    console.log("Error in user login", error);
    res.status(400).json({ message: "Error in user loggedin", error });
  }
};

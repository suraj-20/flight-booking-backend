const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const createTokenForUser = require("../services/authentication");

module.exports.handleUserRegister = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone_number } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone_number,
    });

    res.status(201).json({ message: "User registered sucessfull", user });
  } catch (error) {
    console.error("Error in user registeration", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.handleUserLogin = async (req, res) => {
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

    res
      .status(200)
      .json({ message: "User logged in sucessfully", user, token });
  } catch (error) {
    console.error("Error in user login", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.handleUserUpdate = async (req, res) => {
  try {
    const userId = req.userId

    const { state, city, country, pincode } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { state, city, country, pincode },
      { new: true }
    );


    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.handleGetUserDetails = async (req, res) => {
  try {
    // const userId = req.params;
    const user = await User.findById(req.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in getting user", error);
    res.status(400).json({ message: error.message });
  }
};

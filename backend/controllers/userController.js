const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //used to hash password
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Register users
//@route Post /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //when you send a request to this endpoint you would have some body data
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //   //since user doesn't exist, now hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
//if the user was created successfully, return a json object
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Login
//@route Post /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const oldUser = await User.findOne({ email });

  //check match user password
  const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  if (oldUser && isPasswordCorrect) {
    res.status(201).json({
      _id: oldUser.id,
      name: oldUser.name,
      email: oldUser.email,
      token: generateToken(oldUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc Get User Data
//@route Get /api/users/me
//@access Private
//protect routes with middleware
const getMe = asyncHandler(async (req, res) => {
  //req.user.id is for whatever user that has been authenticated
  const {_id, name, email} = await User.findById(req.user.id)
  res.status(200).json({
      id: _id,
      name,
      email,
  })
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

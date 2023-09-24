const { response } = require("express");
const asyncHandler = require("express-async-handler");

const GenerateJwtToken = require("../Config/GenerateToken");
const User = require("../models/User.Model");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all Values");
  }

  // we will Check Wether User already Exist or not
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error(`User Already Exist,  ${userExist.name}`);
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: GenerateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.ComparePassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: GenerateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User or Password");
  }
});

//api/user/?search=?
// /api/user/?search=abbbas&fname=Sadiq&address=lahore&gender=male i can access the query variables by req.query.<query variable>
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}); 
module.exports = { registerUser, authUser, allUsers };

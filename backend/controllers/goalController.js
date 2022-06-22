const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
//@desc Get goals
//@route Get /api/goals
//@access Private view if authenticated.
//now you can only see specific users goals
const getGoals = asyncHandler(async (req, res) => {
  //gets only this specific users goals
  //we can access req,user because of the protect middleware
  //{user: req.user.id}: we have the user fied on the Goal model
  const goals = await Goal.find({ user: req.user.id }); //gotten form middleware token
  res.status(200).json(goals);
});

//@desc Set goal
//@route Set /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text parameter");
  }
  //the model has 2 fields the text and user parameters
  //So user parameter need to be passed using the req.user
  //text parameter gets access to the users entered data using req.body.text
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id, //gotten from middleware token
  });
  res.status(200).json(goal);
});

//@desc Update goals
//@route Put /api/goals
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); //req.params.id would be in the url

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //making sure on the user cam update their goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //if goal is found, then update it
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc Delete goals
//@route Delete /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //making sure on the user cam update their goals
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  //not need to save it into a constant because it's not gonna be there
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoals,
};

import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";


export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const validRoles = ["student", "teacher", "admin", "parent"];
  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error("Invalid role specified");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  try {
    const savedUser = await newUser.save();
    generateToken(res, savedUser._id);

    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      role: savedUser.role,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to create user");
  }
});



export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }

  // Check if the user exists in the database
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401);
    throw new Error("User not found");
  }

  // Compare provided password with stored hashed password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Generate a token and set it as a cookie
  generateToken(res, existingUser._id);

  // Respond with user details (exclude sensitive data like password)
  res.status(200).json({
    userInfo: {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      role: existingUser.role,
    }
  });
});




export const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie
  res.cookie('jwt', '', {
    httpOnly: true, // Prevent client-side access
    secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    sameSite: 'strict', // Prevent CSRF
    expires: new Date(0), // Set the expiration to the past
  });

  // Respond with a success message
  res.status(200).json({ message: "Logged out successfully" });
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.status(404);
    throw new Error('No users found');
  }
  res.json(users);
});

export const getSpecificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const specificUser = await User.findById(id);

  if (!specificUser) {
    res.status(404);
    throw new Error("User not found");
  }

  // Respond with user details (exclude sensitive fields)
  res.status(200).json({
    _id: specificUser._id,
    username: specificUser.username,
    email: specificUser.email,
    role: specificUser.role, // Optional: include role if relevant
    isAdmin: specificUser.isAdmin,
  });
});


export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  // Fetch the user by ID from the request
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Respond with user details (exclude sensitive fields like password)
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role, // Optionally include the role for better context
  });
});


export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  // Find the user by ID
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update fields only if provided in the request body
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  // Hash and update the password if provided
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  // Save the updated user
  const updatedUser = await user.save();

  // Respond with the updated user details
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    role: updatedUser.role, // Optionally include the role
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Delete the user
  await user.deleteOne();

  // Respond with a success message
  res.status(200).json({ message: "User removed successfully" });
});

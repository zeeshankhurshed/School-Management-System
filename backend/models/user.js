import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "parent"],
      required: true,
      default: "student",
    },
    // contactNumber: {
    //   type: String,
    //   trim: true,
    // },
    // address: {
    //   type: String,
    //   trim: true,
    // },
    // dateOfBirth: {
    //   type: Date,
    // },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    // },
    // profilePicture: {
    //   type: String, // URL to the profile picture
    // },
    // assignedClass: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Class", // Reference to a Class schema if students or teachers are assigned to classes
    // },
    // subjects: {
    //   type: [String], // Array of subjects for teachers or students
    // },
    // parentDetails: {
    //   type: {
    //     fatherName: { type: String, trim: true },
    //     motherName: { type: String, trim: true },
    //     guardianContact: { type: String, trim: true },
    //   },
    // },
    // emergencyContact: {
    //   type: String, // Emergency contact number
    // },
    // status: {
    //   type: String,
    //   enum: ["active", "inactive", "suspended"],
    //   default: "active",
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

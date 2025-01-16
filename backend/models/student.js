import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  photo: {
    type: String,
    default: '',
  },
  admissionNumber: {
    type: String,
    required: true,
    unique: true,
  },
  schoolClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolClass", // Assumes there's a `SchoolClass` model
    required: true,
  },
  section: {
    type: String,
  },
  rollNumber: {
    type: Number,
  },
  academicYear: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    relation: {
      type: String,
    },
  },
  email: {
    type: String,
    validate: {
      validator: (v) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v), // Email validation regex
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  address: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

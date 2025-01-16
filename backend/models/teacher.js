import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dob: { type: Date },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    employeeId: { type: String, required: true, unique: true },
    subject: [{ type: String }],
    joiningDate: { type: Date, required: true },
    qualification: [{ type: String }],
    experience: { type: Number },
    salary: { type: Number },
    username: { type: String, required: true, unique: true }, // Changed type from Boolean to String
    password: { type: String, required: true },
    roles: [{ type: String, enum: ['teacher', 'admin'] }], // Added quotes around enum values
    profilePicture: { type: String },
  },
  { timestamps: true } // Corrected typo from 'timeStaps' to 'timestamps'
);

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;

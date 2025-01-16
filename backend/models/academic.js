import mongoose from 'mongoose';

const academicGuidanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  tips: [
    {
      type: String, // Each tip as a string
      required: true,
    },
  ],
  resources: [
    {
      name: { type: String, required: true }, // Resource name
      link: { type: String, required: true }, // Resource link
    },
  ],
}, { timestamps: true });

const AcademicGuidance = mongoose.model('AcademicGuidance', academicGuidanceSchema);
export default AcademicGuidance;

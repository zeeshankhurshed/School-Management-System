import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

// Optional: Adding index for better search performance
classSchema.index({ name: 1 });

const SchoolClass = mongoose.model('SchoolClass', classSchema);

export default SchoolClass;
import mongoose from 'mongoose';

const funContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Puzzle", "Quiz", "Trivia", "Special Day"],
    required: [true, "Type is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String, // Content details or quiz/trivia question
    required: [true, "Description is required"],
    trim: true,
  },
  link: {
    type: String, // Optional link to interactive content or more details
    trim: true,
  },
}, { timestamps: true });

const FunContent = mongoose.model('FunContent', funContentSchema);
export default FunContent;

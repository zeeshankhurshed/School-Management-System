
import mongoose from 'mongoose';

const schoolNewsSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], trim: true },
  subtitle: { type: String, trim: true },
  date: { type: Date, required: [true, "Date is required"] },
  category: { type: String, required: [true, "Category is required"] },
  location: { type: String, trim: true },
  description: { type: String, required: [true, "Description is required"], trim: true },
  readMoreLink: { type: String, trim: true },
  image: { type: String, trim: true }, // Add image field
});

const SchoolNews = mongoose.model('SchoolNews', schoolNewsSchema);
export default SchoolNews;

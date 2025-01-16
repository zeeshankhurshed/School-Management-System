import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  achievement: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Highlight = mongoose.model('Highlight', highlightSchema);
export default Highlight;

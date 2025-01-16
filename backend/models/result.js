import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subjects: [{
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
        marks: { type: Number, required: true },
        grade: { type: String, required: true }
    }],
    totalMarks: { type: Number, required: true },
    averageMarks: { type: Number, required: true },
    performanceCategory: { type: String, required: true }
});

const Result = mongoose.model('Result', resultSchema);

export default Result;

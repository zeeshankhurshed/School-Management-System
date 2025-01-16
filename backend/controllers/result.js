import { asyncHandler } from "../middleware/asyncHandler.js";
import Result from "../models/result.js";
import mongoose from "mongoose";
import Subject from "../models/subject.js";

export const createResult = asyncHandler(async (req, res) => {
    try {
        // Log the request body to check the incoming data
        // console.log(req.body);

        // Destructure the data from the request body
        const { studentId, subjects, totalMarks, averageMarks, performanceCategory } = req.body;

        // Check if subjects array is valid and has data
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: 'Subjects data is required and should be an array' });
        }

        // Check if totalMarks and averageMarks are numbers
        if (typeof totalMarks !== 'number' || typeof averageMarks !== 'number') {
            return res.status(400).json({ message: 'Total marks and average marks must be numbers' });
        }

        // Check if performanceCategory is a valid string
        const validCategories = ['Brilliant', 'Average', 'Excellent', 'Below Average', 'Fail'];
        if (!validCategories.includes(performanceCategory)) {
            return res.status(400).json({ message: 'Invalid performance category' });
        }

        // Check if the student already has a result
        const existingResult = await Result.findOne({ studentId });
        if (existingResult) {
            return res.status(400).json({ message: 'Result already exists for this student' });
        }

        // Create a new result document
        const newResult = new Result({
            studentId,
            subjects,
            totalMarks,
            averageMarks,
            performanceCategory
        });

        // Save the new result to the database
        const savedResult = await newResult.save();

        // Return the saved result in the response
        res.status(201).json(savedResult);
    } catch (error) {
        console.error('Error creating result:', error);
        res.status(500).json({ message: 'Failed to create result' });
    }
});


export const getAllResults = asyncHandler(async (req, res) => {
  try {
      const { search = '', page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);

      const matchCondition = search
  ? {
      $or: [
        { 'student.fullName': { $regex: search, $options: 'i' } },
        { 'student.admissionNumber': { $regex: search, $options: 'i' } },
        { 'student.rollNumber': parseInt(search, 10) || 0 }, // Roll number might be numeric
      ],
    }
  : {};


      // Log match condition
    //   console.log('Search Query:', search);
    //   console.log('Match Condition:', JSON.stringify(matchCondition, null, 2));

      const results = await Result.aggregate([
          {
              $lookup: {
                  from: 'students', // Name of the Student collection
                  localField: 'studentId',
                  foreignField: '_id',
                  as: 'student',
              },
          },
          { $unwind: '$student' }, // Ensure student is not an array
          { $match: matchCondition }, // Apply the search filter
          {
              $project: {
                  _id: 1,
                  studentId: 1,
                  totalMarks: 1,
                  averageMarks: 1,
                  performanceCategory: 1,
                  subjects: 1,
                  // Include student fields in the projection
                  'student.fullName': 1,
                  'student.admissionNumber': 1,
                  'student.rollNumber': 1,
                  'student.schoolClass': 1,
                  'student.section': 1,
              },
          },
          { $skip: (pageNumber - 1) * limitNumber },
          { $limit: limitNumber },
      ]);

      // Log results
    //   console.log('Aggregated Results:', JSON.stringify(results, null, 2));

      const totalResults = await Result.aggregate([
          {
              $lookup: {
                  from: 'students',
                  localField: 'studentId',
                  foreignField: '_id',
                  as: 'student',
              },
          },
          { $unwind: '$student' },
          { $match: matchCondition },
          { $count: 'total' },
      ]);

      const total = totalResults[0]?.total || 0;

      // Log total count
    //   console.log('Total Results Count:', total);

      res.status(200).json({
          results,
          total,
          page: pageNumber,
          limit: limitNumber,
      });
  } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ message: 'Failed to fetch results' });
  }
});




  


export const getStudentResult = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params;
        // console.log("Fetching result for studentId:", studentId); // Log the studentId

        const result = await Result.findOne({ studentId }).populate('studentId');
        // console.log("Query result:", result); // Log the result of the query

        if (!result) {
            return res.status(404).json({ message: 'Result not found for this student' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching student result:', error);
        res.status(500).json({ message: 'Failed to fetch student result' });
    }
});



export const updateResult = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.studentId; // Extract the studentId as a string
    const { subjects, totalMarks, averageMarks, performanceCategory } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Validate subjectId and ensure it references an existing Subject
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: "Subjects data is required and should be an array" });
    }

    const subjectIds = subjects.map(sub => sub.subjectId);
    if (subjectIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Each subject must contain a valid ObjectId" });
    }

    const existingSubjects = await Subject.find({ _id: { $in: subjectIds } });
    if (existingSubjects.length !== subjects.length) {
      return res.status(400).json({ message: "One or more subjects do not exist" });
    }

    // Update the result
    const updatedResult = await Result.findOneAndUpdate(
      { studentId },
      {
        subjects,
        totalMarks,
        averageMarks,
        performanceCategory,
      },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found for this student" });
    }

    res.status(200).json(updatedResult);
  } catch (error) {
    console.error("Error updating result:", error);
    res.status(500).json({ message: "Failed to update result" });
  }
});

  



export const deleteResult = asyncHandler(async (req, res) => {
    try {
        const { studentId } = req.params; // Using studentId from the URL parameter

        // Find and delete the result by studentId
        const deletedResult = await Result.findOneAndDelete({ studentId });

        if (!deletedResult) {
            return res.status(404).json({ message: 'Result not found for this student' });
        }

        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        console.error('Error deleting result:', error);
        res.status(500).json({ message: 'Failed to delete result' });
    }
});

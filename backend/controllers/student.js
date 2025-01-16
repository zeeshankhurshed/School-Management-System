import { asyncHandler } from "../middleware/asyncHandler.js";
import Student from "../models/student.js";

export const createStudent = asyncHandler(async (req, res) => {
  try {
    // Create a new student document from the request body
    const newStudent = new Student({
      fullName: req.body.fullName,
      guardianName: req.body.guardianName,
      admissionNumber: req.body.admissionNumber,
      schoolClass: req.body.schoolClass,
      section: req.body.section,
      rollNumber: req.body.rollNumber,
      academicYear: req.body.academicYear,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      photo: req.body.photo,  // Assuming image path is included
      emergencyContact: {
        name: req.body.emergencyName,
        phone: req.body.emergencyPhone,
        relation: req.body.emergencyRelation,
      },
    });

    // Save the student document to the database
    const savedStudent = await newStudent.save();

    // Return the saved student as a response
    res.json(savedStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: error.message });
  }
});


export const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const searchCondition = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: 'i' } },
            { rollNumber: !isNaN(search) ? parseInt(search, 10) : undefined },
          ],
        }
      : {};

    const totalStudents = await Student.countDocuments(searchCondition);

    const students = await Student.find(searchCondition)
      .populate({
        path: 'schoolClass',
        match: search ? { name: { $regex: search, $options: 'i' } } : {},
      })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({
      students,
      total: totalStudents,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export const getSpecificStudent=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const specificStudent=await Student.findById(id);
        if(!specificStudent){
            return res.status(404).json({message:"Student not found"});
        }
        res.json(specificStudent);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

export const updateStudent = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Request Body:", req.body); // Log the request body
      const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedStudent = await Student.findByIdAndDelete(id);
  
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(`Error deleting student with ID ${id}:`, error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
import { asyncHandler } from "../middleware/asyncHandler.js";
import Teacher from "../models/teacher.js";

export const createTeacher = asyncHandler(async (req, res) => {
  try {
    // Check if a teacher with the same email or employeeId already exists
    const { email, employeeId } = req.body;
    // console.log("Request Body:", req.body);

    const existingTeacher = await Teacher.findOne({
      $or: [{ email }, { employeeId }]
    });

    if (existingTeacher) {
      return res.status(403).json({ message: "Teacher already exists" });
    }

    // Create a new teacher
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    console.log("Saved Teacher:", savedTeacher);

    // Return the created teacher with a 201 status
    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error("Error creating teacher:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build search condition dynamically
    const searchCondition = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { employeeId: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch total count for pagination
    const totalTeachers = await Teacher.countDocuments(searchCondition);

    // Fetch paginated teachers
    const teachers = await Teacher.find(searchCondition)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.json({
      teachers,
      total: totalTeachers,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
});




export const getSpecificTeacher=asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const specificTeacher=await Teacher.findById(id);
        if(!specificTeacher){
            return res.status(404).json({message:"Teacher not found"});
        }
        res.json(specificTeacher);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

export const updateTeacher=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params;
    const updatedTeacher=await Teacher.findByIdAndUpdate(id,req.body,{
      new:true,
    });
    if(!updatedTeacher){
      return res.status(404).json({message:"Teacher not found"});
    }
    res.json(updatedTeacher)
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});    
  }
})


export const deleteTeacher=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params;
    const deleteTeacher=await Teacher.findByIdAndDelete(id);
    if(!deleteTeacher){
      return res.status(404).json({message:"Teacher not found"});
    }
    res.json({message:"Teacher deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
})
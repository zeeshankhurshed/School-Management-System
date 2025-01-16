import { asyncHandler } from "../middleware/asyncHandler.js";
import Subject from "../models/subject.js";

export const createSubject = asyncHandler(async (req, res) => {
    try {
        const { name, category, description } = req.body;

        // Check for duplicate subject
        const existingSubject = await Subject.findOne({ name, category });
        if (existingSubject) {
            return res.status(400).json({
                message: "Subject with the same name and category already exists."
            });
        }

        // Create new subject
        const subject = new Subject({ name, category, description });
        const savedSubject = await subject.save();

        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export const getAllSubjects=asyncHandler(async(req,res)=>{
try {
    const {category}=req.query;
    const filter=category?{category}:{};
    const subjects=await Subject.find(filter);
    res.json(subjects);
} catch (error) {
    res.status(500).json({message:error.message});
}
})

export const getSpecificSubject=asyncHandler(async(req,res)=>{
    try {
        const specificSubject=await Subject.findOne({_id:req.params.id});

        if(!specificSubject){
            return res.status(404).json({error:"Subject not found"});
        }
        res.json(specificSubject);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

export const updateSubject=asyncHandler(async(req,res)=>{
    try {
        const {name,category,description}=req.body;
        const updatedSubject=await Subject.findByIdAndUpdate(
            req.params.id,
            {name,category,description},
            {new:true}
        );
        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


export const deleteSubject = asyncHandler(async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // If the subject does not exist
        if (!deletedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        // 204 No Content response should not include a response body
        res.status(200).json({
            message: "Subject deleted successfully",
            deletedSubject,
        });
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).json({ message: error.message });
    }
});


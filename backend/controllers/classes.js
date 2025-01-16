import { asyncHandler } from "../middleware/asyncHandler.js";
import SchoolClass from "../models/schoolCass.js";


// Create a new class
export const createClass = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Class name is required" });
        }

        // Check if the class already exists
        const existingClass = await SchoolClass.findOne({ name });
        if (existingClass) {
            return res.status(400).json({ message: "Class already exists" });
        }

        // Create a new class
        const newClass = new SchoolClass({ name });
        await newClass.save();

        return res.status(201).json({
            message: "Class created successfully",
            class: newClass,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while creating the class" });
    }
});

// Update Class
export const updateClass = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body; // Extract name from the request body
        const { id } = req.params; // Extract the class ID from URL parameters

        // Check if the name is provided
        if (!name || !name.trim()) {
            return res.status(400).json({ error: "Class name is required" });
        }

        // Find the class by its ID
        const existingClass = await SchoolClass.findById(id);

        // If the class doesn't exist, return a 404 error
        if (!existingClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        // Update the class name and save
        existingClass.name = name;
        const updatedClass = await existingClass.save();

        res.json(updatedClass);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the class" });
    }
});


// Remove Class
export const removeClass = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Get the class ID from the request parameters

        // Find and delete the class by its ID
        const removed = await SchoolClass.findByIdAndDelete(id);

        // If the class wasn't found, return a 404 error
        if (!removed) {
            return res.status(404).json({ error: "Class not found" });
        }

        // Respond with a success message and the deleted class data
        res.status(200).json({
            message: "Class removed successfully",
            removed,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "An error occurred while removing the class" });
    }
});

//get all classes

export const getAllClasses=asyncHandler(async(req,res)=>{
    try {
        const all=await SchoolClass.find({});
        res.json({all});
    } catch (error) {
        console.error(error);
        return res.status(400).json(error.message);
    }
})


// Get a specific class by ID
export const specificClasses = asyncHandler(async (req, res) => {
    try {
        // Find the class by its ID from the request parameters
        const specificClass = await SchoolClass.findOne({ _id: req.params.id });

        // If no class is found, return a 404 response
        if (!specificClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        // Return the found class
        res.json(specificClass);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
});

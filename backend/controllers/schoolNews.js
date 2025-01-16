import { asyncHandler } from "../middleware/asyncHandler.js";
import SchoolNews from "../models/schoolNews.js";


// Create a new school news
export const createSchoolNews = asyncHandler(async (req, res) => {
  try {
    const { title, subtitle, date, category, location, description, readMoreLink, image } = req.body;
    const newsItem = new SchoolNews({ title, subtitle, date, category, location, description, readMoreLink, image });
    await newsItem.save();
    res.status(201).json({ message: 'School News added successfully', data: newsItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all school news
export const getAllSchoolNews = asyncHandler(async (req, res) => {
  try {
    const schoolNews = await SchoolNews.find();
    res.status(200).json({ data: schoolNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get single news
export const getSpecificNews=asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params;
    const specificNews=await SchoolNews.findById(id);
    if(!specificNews){
      return res.status(404).json({message:"News not found"});
    }
    res.json(specificNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
})

// Update a school news item by ID
export const updateSchoolNews =asyncHandler( async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await SchoolNews.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'School News updated successfully', data: updatedNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a school news item by ID
export const deleteSchoolNews = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await SchoolNews.findByIdAndDelete(id);
    res.status(200).json({ message: 'School News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


import { asyncHandler } from '../middleware/asyncHandler.js';
import FunContent from '../models/funContent.js';

// Create new Fun Content
export const createFunContent = asyncHandler(async (req, res) => {
  const { type, title, description, link } = req.body;

  const newFunContent = new FunContent({
    type,
    title,
    description,
    link,
  });

  await newFunContent.save();

  res.status(201).json({
    message: "Fun content created successfully",
    data: newFunContent,
  });
});

// Get all Fun Content
export const getAllFunContent = asyncHandler(async (req, res) => {
  const funContents = await FunContent.find();
  res.status(200).json({
    message: "Fun content fetched successfully",
    data: funContents,
  });
});

// Get a specific Fun Content by ID
export const getFunContentById = asyncHandler(async (req, res) => {
  const funContent = await FunContent.findById(req.params.id);
  if (!funContent) {
    return res.status(404).json({ message: "Fun content not found" });
  }
  res.status(200).json({
    message: "Fun content fetched successfully",
    data: funContent,
  });
});

// Update a specific Fun Content by ID
export const updateFunContent = asyncHandler(async (req, res) => {
  const funContent = await FunContent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!funContent) {
    return res.status(404).json({ message: "Fun content not found" });
  }
  res.status(200).json({
    message: "Fun content updated successfully",
    data: funContent,
  });
});

// Delete a specific Fun Content by ID
export const deleteFunContent = asyncHandler(async (req, res) => {
  const funContent = await FunContent.findByIdAndDelete(req.params.id);
  if (!funContent) {
    return res.status(404).json({ message: "Fun content not found" });
  }
  res.status(200).json({ message: "Fun content deleted successfully" });
});

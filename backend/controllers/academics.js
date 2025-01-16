
import { asyncHandler } from '../middleware/asyncHandler.js';
import AcademicGuidance from '../models/academic.js';

// Create a new academic guidance entry
export const createAcademicGuidance = asyncHandler(async (req, res) => {
  const { title, tips, resources } = req.body;

  const newGuidance = new AcademicGuidance({
    title,
    tips,
    resources,
  });

  await newGuidance.save();

  res.status(201).json({ message: 'Academic guidance added successfully', data: newGuidance });
});

// Get all academic guidance entries
export const getAllAcademicGuidance = asyncHandler(async (req, res) => {
  const guidance = await AcademicGuidance.find();
  res.status(200).json({ message: 'Academic guidance fetched successfully', data: guidance });
});

// Get a single academic guidance entry by ID
export const getAcademicGuidanceById = asyncHandler(async (req, res) => {
  const guidance = await AcademicGuidance.findById(req.params.id);
  if (!guidance) {
    return res.status(404).json({ message: 'Academic guidance not found' });
  }
  res.status(200).json({ message: 'Academic guidance fetched successfully', data: guidance });
});

// Update an academic guidance entry
export const updateAcademicGuidance = asyncHandler(async (req, res) => {
  const guidance = await AcademicGuidance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!guidance) {
    return res.status(404).json({ message: 'Academic guidance not found' });
  }
  res.status(200).json({ message: 'Academic guidance updated successfully', data: guidance });
});

// Delete an academic guidance entry
export const deleteAcademicGuidance = asyncHandler(async (req, res) => {
  const guidance = await AcademicGuidance.findByIdAndDelete(req.params.id);
  if (!guidance) {
    return res.status(404).json({ message: 'Academic guidance not found' });
  }
  res.status(200).json({ message: 'Academic guidance deleted successfully' });
});

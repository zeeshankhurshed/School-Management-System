
import { asyncHandler } from '../middleware/asyncHandler.js';
import Highlight from '../models/highlights.js';


// Create a new highlight

export const createHighlight = asyncHandler(async (req, res) => {
  const { type, name, description, achievement } = req.body;

  // console.log("Request body:", req.body); // Log request data

  if (!type || !name || !description || !achievement) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newHighlight = new Highlight({
      type,
      name,
      description,
      achievement,
    });

    await newHighlight.save();

    res.status(201).json({
      message: 'Highlight created successfully',
      data: newHighlight,
    });
  } catch (error) {
    console.error("Error creating highlight:", error);
    res.status(500).json({ message: 'Failed to create highlight', error: error.message });
  }
});

// Get all highlights
export const getAllHighlights = asyncHandler(async (req, res) => {
  const highlights = await Highlight.find();
  res.status(200).json({
    message: 'Highlights fetched successfully',
    data: highlights,
  });
});

// Get a specific highlight by ID
export const getHighlightById = asyncHandler(async (req, res) => {
  const highlight = await Highlight.findById(req.params.id);
  if (!highlight) {
    return res.status(404).json({ message: 'Highlight not found' });
  }
  res.status(200).json({
    message: 'Highlight fetched successfully',
    data: highlight,
  });
});

// Update a specific highlight by ID
export const updateHighlight = asyncHandler(async (req, res) => {
  const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!highlight) {
    return res.status(404).json({ message: 'Highlight not found' });
  }
  res.status(200).json({
    message: 'Highlight updated successfully',
    data: highlight,
  });
});

// Delete a specific highlight by ID
export const deleteHighlight = asyncHandler(async (req, res) => {
  const highlight = await Highlight.findByIdAndDelete(req.params.id);
  if (!highlight) {
    return res.status(404).json({ message: 'Highlight not found' });
  }
  res.status(200).json({ message: 'Highlight deleted successfully' });
});

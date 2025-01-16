import { asyncHandler } from "../middleware/asyncHandler.js";
import Event from "../models/event.js";


// Create a new event
export const createEvent = asyncHandler(async (req, res) => {
  try {
    const { title, subtitle, date, category, location, description, readMoreLink, image } = req.body;
    const event = new Event({ title, subtitle, date, category, location, description, readMoreLink, image });
    await event.save();
    res.status(201).json({ message: 'Event added successfully', data: event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events
export const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events
export const getSpecificEvent = async (req, res) => {
  try {
    const {id}=req.params;
    const specificevent = await Event.findById(id);
    if(specificevent){
      return res.status(404).json({message:"Event not found"});
    }
    res.status(200).json(specificevent);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

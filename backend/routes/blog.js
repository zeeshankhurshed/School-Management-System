import express from 'express';
import { createSchoolNews, getAllSchoolNews, updateSchoolNews, deleteSchoolNews, getSpecificNews } from '../controllers/schoolNews.js';
import {createEvent, getAllEvents, updateEvent, deleteEvent, getSpecificEvent  } from '../controllers/event.js';
import { createAcademicGuidance, deleteAcademicGuidance, getAcademicGuidanceById, getAllAcademicGuidance, updateAcademicGuidance } from '../controllers/academics.js';
import { createHighlight ,getAllHighlights,  getHighlightById, updateHighlight,deleteHighlight,} from '../controllers/highlights.js';
import { createFunContent, deleteFunContent, getAllFunContent, getFunContentById, updateFunContent } from '../controllers/funContent.js';


const router = express.Router();

// School News Routes
router.post('/school-news', createSchoolNews);
router.get('/school-news', getAllSchoolNews);
router.get('/school-news/:id', getSpecificNews);
router.put('/school-news/:id', updateSchoolNews);
router.delete('/school-news/:id', deleteSchoolNews);

// Event Routes
router.post('/events', createEvent);
router.get('/events', getAllEvents);
router.get('/events/:id', getSpecificEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);


// academics
router.post('/academic-guidance', createAcademicGuidance);
router.get('/academic-guidance', getAllAcademicGuidance);
router.get('/academic-guidance/:id', getAcademicGuidanceById);
router.put('/academic-guidance/:id', updateAcademicGuidance);
router.delete('/academic-guidance/:id', deleteAcademicGuidance);


//highlights
router.post('/highlights', createHighlight);
router.get('/highlights', getAllHighlights);
router.get('/highlights/:id', getHighlightById);
router.put('/highlights/:id', updateHighlight);
router.delete('/highlights/:id', deleteHighlight);

// funContent
router.post('/fun-content', createFunContent);
router.get('/fun-content', getAllFunContent);
router.get('/fun-content/:id', getFunContentById);
router.put('/fun-content/:id', updateFunContent);
router.delete('/fun-content/:id', deleteFunContent);


export default router;

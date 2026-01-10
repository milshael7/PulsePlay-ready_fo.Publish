// backend/src/survey/survey.routes.js

const express = require('express');
const router = express.Router();
const surveyController = require('./survey.controller');

// -----------------------
// Get all surveys
// -----------------------
router.get('/', (req, res) => {
  const allSurveys = surveyController.getAllSurveys();
  res.json(allSurveys);
});

// -----------------------
// Get a survey by ID
// -----------------------
router.get('/:id', (req, res) => {
  const survey = surveyController.getSurveyById(req.params.id);
  if (!survey) return res.status(404).json({ message: 'Survey not found' });
  res.json(survey);
});

// -----------------------
// Submit a survey response
// -----------------------
router.post('/:id/response', (req, res) => {
  const { userId, answers } = req.body;
  if (!userId || !answers) return res.status(400).json({ message: 'Missing userId or answers' });

  const response = surveyController.submitResponse(req.params.id, userId, answers);
  if (!response) return res.status(404).json({ message: 'Survey not found' });

  res.json({ message: 'Response recorded', response });
});

// -----------------------
// Admin: Get all responses for a survey
// -----------------------
router.get('/:id/responses', (req, res) => {
  const surveyResponses = surveyController.getResponsesBySurveyId(req.params.id);
  res.json(surveyResponses);
});

// -----------------------
// Export router
// -----------------------
module.exports = router;
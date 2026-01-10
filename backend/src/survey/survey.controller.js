// backend/src/survey/survey.controller.js

// In-memory storage (replace with DB later)
const surveys = [
  {
    id: 1,
    title: 'User Experience Survey',
    questions: [
      { id: 1, text: 'How satisfied are you with PulsePlay?' },
      { id: 2, text: 'What feature do you like the most?' }
    ]
  }
];

const responses = []; // store user responses

// -----------------------
// Get all surveys
// -----------------------
exports.getAllSurveys = () => {
  return surveys;
};

// -----------------------
// Get survey by ID
// -----------------------
exports.getSurveyById = (id) => {
  return surveys.find(s => s.id === parseInt(id)) || null;
};

// -----------------------
// Submit a survey response
// -----------------------
exports.submitResponse = (surveyId, userId, answers) => {
  const survey = surveys.find(s => s.id === parseInt(surveyId));
  if (!survey) return null;

  const response = {
    surveyId: survey.id,
    userId,
    answers,
    timestamp: new Date()
  };
  responses.push(response);
  return response;
};

// -----------------------
// Get all responses for a survey (admin view)
// -----------------------
exports.getResponsesBySurveyId = (surveyId) => {
  return responses.filter(r => r.surveyId === parseInt(surveyId));
};
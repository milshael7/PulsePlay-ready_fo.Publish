// =======================
// server.js
// =======================

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const tradingRoutes = require('./src/trading/trading.route');
const adminRoutes = require('./src/admin/admin.routes');
const surveyRoutes = require('./src/survey/survey.routes');

const storeRoutes = require('./src/store/store.routes');
const messageRoutes = require('./src/message/message.routes');

const app = express();

// -----------------------
// Middleware
// -----------------------
app.use(cors());
app.use(bodyParser.json());

// -----------------------
// API Routes
// -----------------------
app.use('/trading', tradingRoutes);
app.use('/admin', adminRoutes);
app.use('/survey', surveyRoutes);

app.use('/store', storeRoutes);
app.use('/message', messageRoutes);

// -----------------------
// Health check
// -----------------------
app.get('/', (req, res) => res.send('PulsePlay backend is running'));

// -----------------------
// Start server
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
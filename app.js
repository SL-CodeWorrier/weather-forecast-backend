const express = require('express');
const cors = require('cors');
const app = express();
const weatherController = require('./src/controllers/WeatherController');

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', weatherController);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
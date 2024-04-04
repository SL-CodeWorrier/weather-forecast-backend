const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = express.Router();
const GetWeatherDataUseCase = require('../useCases/GetWeatherDataUseCase');

const getWeatherDataUseCase = new GetWeatherDataUseCase();

router.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather API',
            version: '1.0.0',
            description: 'Documentation for Weather API | COBSCCOMP4Y222P-013',
        },
        servers: [{
            url: 'https://weatherapinodejsbackendcw.onrender.com/api/v1'
        }]
    },
    apis: ['./src/controllers/*.js'], // Adjusted to include all controller files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.patch('/weather/lk/byDistrict', async (req, res) => {
    const { district, weatherData } = req.body;
    try {
        const updateResponse = await getWeatherDataUseCase.executeUpdateWeatherDataByDistrict(district, weatherData);
        res.json(updateResponse);
    } catch (error) {
        console.error('Error in updating weather data by district:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


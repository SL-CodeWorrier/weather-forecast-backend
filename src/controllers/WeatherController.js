const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = express.Router();
const GetWeatherDataUseCase = require('../useCases/GetWeatherDataUseCase');

const getWeatherDataUseCase = new GetWeatherDataUseCase();

router.use(express.json());
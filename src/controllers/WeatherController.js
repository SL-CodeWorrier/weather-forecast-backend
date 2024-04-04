const express = require('express');
const router = express.Router();
const GetWeatherDataUseCase = require('../useCases/GetWeatherDataUseCase');

const getWeatherDataUseCase = new GetWeatherDataUseCase();

router.use(express.json());

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

router.get('/weather/lk/latest', async (req, res) => {
    try {
        const weatherDataResponse = await getWeatherDataUseCase.execute();
        res.json(weatherDataResponse);
    } catch (error) {
        console.error('Error in fetching weather data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/weather/lk/byDate/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const weatherDataResponse = await getWeatherDataUseCase.executeByDate(new Date(date));
        res.json(weatherDataResponse);
    } catch (error) {
        console.error('Error in fetching weather data by date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/weather/lk/byOrder/:order/:weatherType', async (req, res) => {

    const { order, weatherType } = req.params;

    try {
        const weatherDataResponse = await getWeatherDataUseCase.executeByOrder(order, weatherType);
        res.json(weatherDataResponse);
    } catch (error) {
        console.error('Error in fetching weather data by order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/weather/lk/byValue/:value/:stack/:weatherType/:isDistrictsOnly', async (req, res) => {
    const { value, stack, weatherType, isDistrictsOnly } = req.params;
    try {
        const weatherDataResponse = await getWeatherDataUseCase.executeByValue(parseFloat(value), parseInt(stack), weatherType, isDistrictsOnly === 'true');
        res.json(weatherDataResponse);
    } catch (error) {
        console.error('Error in fetching weather data by value:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/weather/lk/byDistrict/:district', async (req, res) => {
    const { district } = req.params;
    try {
        const weatherDataResponse = await getWeatherDataUseCase.executeByDistrict(district);
        res.json(weatherDataResponse);
    } catch (error) {
        console.error('Error in fetching weather data by district:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


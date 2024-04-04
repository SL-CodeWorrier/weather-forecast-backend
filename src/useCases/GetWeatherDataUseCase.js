const WeatherRepository = require('../repositories/WeatherRepository');
const ServiceResponse = require('../entities/ServiceResponse');

class GetWeatherDataUseCase {

    constructor() {
        this.weatherRepository = WeatherRepository
    }

    async executeInsertWeatherData(weatherData){
        try {
            const weatherDataResponse = await this.weatherRepository.insertWeatherData(weatherData);
            return weatherDataResponse;
        } catch (error) {
            console.error('Error in GetWeatherDataUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataUseCase!");
        }
    }

    async executeUpdateWeatherDataByDistrict(district, weatherData) {
        try {
            const weatherDataResponse = await this.weatherRepository.updateWeatherDataByDistrict(district, weatherData);
            return weatherDataResponse;
        } catch (error) {
            console.error('Error in executeUpdateWeatherDataByDistrict:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute updateWeatherDataByDistrict!");
        }
    }

    async execute() {
        try {
            const weatherDataResponse = await this.weatherRepository.getWeatherData();
            return weatherDataResponse;
        } catch (error) {
            // Handle error
            console.error('Error in GetWeatherDataUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataUseCase!");
        }
    }

    async executeByDate(date) {
        try {
            const weatherDataResponse = await this.weatherRepository.getWeatherDataByDate(date);
            return weatherDataResponse;
        } catch (error) {
            // Handle error
            console.error('Error in GetWeatherDataByDateUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataByDateUseCase!");
        }
    }

    async executeByOrder(order, weatherType) {
        try {
            const weatherDataResponse = await this.weatherRepository.getWeatherDataByOrder(order, weatherType);
            return weatherDataResponse;
        } catch (error) {
            // Handle error
            console.error('Error in GetWeatherDataByOrderUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataByOrderUseCase!");
        }
    }

    async executeByValue(value, stack, weatherType, isDistrictsOnly) {
        try {
            const weatherDataResponse = await this.weatherRepository.getWeatherDataByValue(value, stack, weatherType, isDistrictsOnly);
            return weatherDataResponse;
        } catch (error) {
            // Handle error
            console.error('Error in GetWeatherDataByValueUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataByValueUseCase!");
        }
    }

    async executeByDistrict(district) {
        try {
            const weatherDataResponse = await this.weatherRepository.getWeatherDataByDistrict(district);
            return weatherDataResponse;
        } catch (error) {
            // Handle error
            console.error('Error in GetWeatherDataByDistrictUseCase:', error);
            return new ServiceResponse('fail', new Date(), error, "Failed to execute GetWeatherDataByDistrictUseCase!");
        }
    }
}

module.exports = GetWeatherDataUseCase;
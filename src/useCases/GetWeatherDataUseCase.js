const WeatherRepository = require('../repositories/WeatherRepository');
const ServiceResponse = require('../entities/ServiceResponse');

class GetWeatherDataUseCase {

    constructor() {
        this.weatherRepository = WeatherRepository
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
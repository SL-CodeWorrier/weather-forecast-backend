const { MongoClient, ServerApiVersion  } = require('mongodb');
const ServiceResponse = require('../entities/ServiceResponse');
const cron = require('node-cron');

// Connection URI
const uri = '';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

async function updateWeatherDataByDistrict(district, weatherData) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        weatherData._district = district

        // Using upsert option to update if exists or insert if not
        const result = await collection.updateOne(
            { district: district },
            { $set: weatherData },
            { upsert: true }
        );

        let message;
        if (result.upsertedCount > 0) {
            console.log('New district inserted with weather data.');
            message = 'New district inserted with weather data.';
        } else if (result.modifiedCount > 0) {
            console.log(result.modifiedCount, 'weather data records updated.');
            message = `${result.modifiedCount} weather data records updated successfully!`;
        } else {
            message = "No weather data records updated.";
        }

        const serviceResponse = new ServiceResponse(result.modifiedCount > 0 || result.upsertedCount > 0 ? 'success' : 'fail', new Date(), { updatedCount: result.modifiedCount }, message);
        return serviceResponse;
    } catch (error) {
        console.error('Error updating weather data by district:', error);
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to update weather data by district!");
        return serviceResponse;
    }
}

async function getWeatherData() {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.find({}).toArray();

        const serviceResponse = new ServiceResponse('success', new Date(), data, "Weather data retrieved successfully!");
        return serviceResponse;
    } catch (error) {
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to retrieve weather data!");
        return serviceResponse;
    }
}

async function getWeatherDataByDistrict(district) {

    try {

        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.find({ district }).toArray();
        
        if(data != null){

            const serviceResponse = new ServiceResponse('success', new Date(), data, "Weather data records according to the district was dilivered successfully!");

            return serviceResponse;

        }else{

            const serviceResponse = new ServiceResponse('success', new Date(), data, "Not found any weather data record according to the district!");

            return serviceResponse;
        }
        
    } catch (error) {

        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Something went wrong!");

        return serviceResponse;
    } 
}

module.exports = {
    connectToDatabase,
    updateWeatherDataByDistrict,
    getWeatherDataByDistrict,
    getWeatherData
};
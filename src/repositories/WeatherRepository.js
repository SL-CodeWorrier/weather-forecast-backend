const { MongoClient, ServerApiVersion  } = require('mongodb');
const ServiceResponse = require('../entities/ServiceResponse');
const cron = require('node-cron');

// Connection URI
const uri = 'mongodb+srv://Chathura:chathura123@dbweatherdata.mjclmui.mongodb.net/?retryWrites=true&w=majority&appName=dbweatherdata';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
    } catch (error) {
        console.error('can not connecting to the database:', error);
    }
}

async function updateWeatherDataByDistrict(district, weatherData) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.updateOne(
            { district: district },
            { $set: weatherData },
            { upsert: true }
        );

        let message = '';
        if (result.upsertedCount > 0) {
            message = 'New district inserted with weather data.';
        } else if (data.modifiedCount > 0) {
            console.log(data.modifiedCount, 'weather data records updated.');
            message = `${data.modifiedCount} weather data records updated successfully!`;
        } else {
            message = "No weather data records updated.";
        }
        return new ServiceResponse(data.modifiedCount > 0 || data.upsertedCount > 0 ? 'success' : 'fail', new Date(), { updatedCount: data.modifiedCount }, message);
    } catch (error) {
        console.error('Error updating weather data by district:', error);
        return new ServiceResponse('fail', new Date(), error, "Failed to update weather data by district!");
    }
}

async function getWeatherData() {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.find({}).toArray();

        return new ServiceResponse('success', new Date(), data, "Weather data get successfully!");
    } catch (error) {
        return new ServiceResponse('fail', new Date(), error, "Failed to get weather data!");
    }
}

async function getWeatherDataByDistrict(district) {

    try {

        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.find({ district }).toArray();
        
        if(data != null){

            const serviceResponse = new ServiceResponse('success', new Date(), data, "The delivery of weather data records categorized by district has been completed successfully!");

            return serviceResponse;

        }else{

            const serviceResponse = new ServiceResponse('success', new Date(), data, "No weather data records corresponding to the district were found.");

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
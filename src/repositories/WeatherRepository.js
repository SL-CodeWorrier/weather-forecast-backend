const { MongoClient, ServerApiVersion  } = require('mongodb');
const ServiceResponse = require('../entities/ServiceResponse');
const cron = require('node-cron');

// Connection URI
const uri = 'mongodb+srv://Chathura:chathura123@clusterweatherapicw.t1ezlm4.mongodb.net/?retryWrites=true&w=majority&appName=clusterweatherapicw';
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

        const result = await collection.updateOne(
            { district: district },
            { $set: weatherData },
            { upsert: true }
        );

        let message = '';
        if (result.upsertedCount > 0) {
            message = 'New district inserted with weather data.';
        } else if (data.modifiedCount > 0) {
            console.log(result.modifiedCount, 'weather data records updated.');
            message = `${result.modifiedCount} weather data records updated successfully!`;
        } else {
            message = "No weather data records updated.";
        }
        return new ServiceResponse(result.modifiedCount > 0 || result.upsertedCount > 0 ? 'success' : 'fail', new Date(), { updatedCount: result.modifiedCount }, message);
    } catch (error) {
        console.error('Error updating weather data by district:', error);
        return new ServiceResponse('fail', new Date(), error, "Failed to update weather data by district!");
    }
}

async function getWeatherData() {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const result = await collection.find({}).toArray();

        return new ServiceResponse('success', new Date(), result, "Weather data get successfully!");
    } catch (error) {
        return new ServiceResponse('fail', new Date(), error, "Failed to get weather data!");
    }
}

async function getWeatherDataByDistrict(district) {

    try {

        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const result = await collection.find({ district }).toArray();
        
        if(result != null){

            const serviceResponse = new ServiceResponse('success', new Date(), result, "The delivery of weather data records categorized by district has been completed successfully!");

            return serviceResponse;

        }else{

            const serviceResponse = new ServiceResponse('success', new Date(), result, "No weather data records corresponding to the district were found.");

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
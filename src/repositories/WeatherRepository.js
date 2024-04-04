const { MongoClient, ServerApiVersion  } = require('mongodb');
const ServiceResponse = require('../entities/ServiceResponse');
const cron = require('node-cron');

// Connection URI
const uri = 'mongodb+srv://lakshitha3015:laksitha123@weatherdataclustor.ffxzqvm.mongodb.net/?retryWrites=true&w=majority&appName=weatherDataClustor';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Function to connect to MongoDB and insert weather data
async function insertWeatherData(weatherData) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        console.log('Random Weather Data:', weatherData);

        const result = await collection.insertOne(weatherData);
        console.log(result.insertedCount !== 'dataundefined' ? 'Weather data inserted successfully' : 'Failed to insert weather data');

        const serviceResponse = new ServiceResponse(result.insertedCount > 0 ? 'success' : 'Fail', new Date(), weatherData, result.insertedCount > 0 ?  "Weather data saved successfully!" : "Cannot insert this record!");
        return serviceResponse;
        
    } catch (error) {
        console.error('Error inserting weather data:', error);
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to save weather data!");
        return serviceResponse;
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

async function getWeatherDataByDate(date) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const data = await collection.find({ lastUpdatedDateTime: date }).toArray();

        const serviceResponse = new ServiceResponse('success', new Date(), data, "Weather data retrieved successfully by date!");
        return serviceResponse;
    } catch (error) {
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to retrieve weather data by date!");
        return serviceResponse;
    }
}

async function getWeatherDataByOrder(order, weatherType) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const sortOptions = {};
        sortOptions[weatherType] = order === 'Ascending' ? 1 : -1;

        const data = await collection.find({}).sort(sortOptions).toArray();

        const serviceResponse = new ServiceResponse('success', new Date(), data, "Weather data retrieved successfully by order!");
        return serviceResponse;
    } catch (error) {
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to retrieve weather data by order!");
        return serviceResponse;
    }
}

async function getWeatherDataByValue(value, stack, weatherType, isDistrictsOnly) {
    try {
        const database = client.db('dbWeather');
        const collection = database.collection('weatherData');

        const query = {};
        query[weatherType] = stack === 1 ? { $gt: value } : { $lt: value };

        const projection = isDistrictsOnly ? { district: 1, _id: 0 } : {};

        const data = await collection.find(query, projection).toArray();

        const serviceResponse = new ServiceResponse('success', new Date(), data, "Data retrieved successfully by value!");
        return serviceResponse;
    } catch (error) {
        const serviceResponse = new ServiceResponse('fail', new Date(), error, "Failed to retrieve data by value!");
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
    insertWeatherData,
    updateWeatherDataByDistrict,
    getWeatherDataByDistrict,
    getWeatherData,
    getWeatherDataByDate,
    getWeatherDataByOrder,
    getWeatherDataByValue,
};
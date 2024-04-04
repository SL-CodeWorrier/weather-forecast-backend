class WeatherData {
    constructor(temperature, isActiveIoTDeviceTemperature, humidity, isActiveIoTDeviceHumidity, airPressure, isActiveIoTDeviceAirPressure, lastUpdatedDateTime, district) {
      this._temperature = temperature;
      this._isActiveIoTDeviceTemperature = isActiveIoTDeviceTemperature;
      this._humidity = humidity;
      this._isActiveIoTDeviceHumidity = isActiveIoTDeviceHumidity;
      this._airPressure = airPressure;
      this._isActiveIoTDeviceAirPressure = isActiveIoTDeviceAirPressure;
      this._lastUpdatedDateTime = lastUpdatedDateTime;
      this._district = district;
    }

    // Getters and setters for temperature
    get temperature() {
        return this._temperature;
    }
    
    set temperature(value) {
        // Add validation logic if needed
        this._temperature = value;
      }
    
    // Getters and setters for isActiveIoTDeviceTemperature
    get isActiveIoTDeviceTemperature() {
        return this._isActiveIoTDeviceTemperature;
    }
    
    set isActiveIoTDeviceTemperature(value) {
        // Add validation logic if needed
        this._isActiveIoTDeviceTemperature = value;
    }
    
    // Getters and setters for humidity
    get humidity() {
        return this._humidity;
    }
    
    set humidity(value) {
        // Add validation logic if needed
        this._humidity = value;
    }
    
    // Getters and setters for isActiveIoTDeviceHumidity
    get isActiveIoTDeviceHumidity() {
        return this._isActiveIoTDeviceHumidity;
    }
    
    set isActiveIoTDeviceHumidity(value) {
        // Add validation logic if needed
        this._isActiveIoTDeviceHumidity = value;
    }
    
    // Getters and setters for airPressure
    get airPressure() {
        return this._airPressure;
    }
    
    set airPressure(value) {
        // Add validation logic if needed
        this._airPressure = value;
    }
    
    // Getters and setters for isActiveIoTDeviceAirPressure
    get isActiveIoTDeviceAirPressure() {
        return this._isActiveIoTDeviceAirPressure;
    }
    
    set isActiveIoTDeviceAirPressure(value) {
        // Add validation logic if needed
        this._isActiveIoTDeviceAirPressure = value;
    }
    
    // Getters and setters for lastUpdatedDateTime
    get lastUpdatedDateTime() {
        return this._lastUpdatedDateTime;
    }
    
    set lastUpdatedDateTime(value) {
        // Add validation logic if needed
        this._lastUpdatedDateTime = value;
    }
    
    // Getters and setters for district
    get district() {
        return this._district;
    }
    
    set district(value) {
        // Add validation logic if needed
        this._district = value;
    }

}

module.exports = WeatherData;
class WeatherData {
    constructor(temperature, humidity, airPressure, updatedDateTime, district) {
      this._temperature = temperature;
      this._humidity = humidity;
      this._airPressure = airPressure;
      this._updatedDateTime = updatedDateTime;
      this._district = district;
    }

    get temperature() {
        return this._temperature;
    }
    
    set temperature(value) {
        this._temperature = value;
      }
    
    
    get humidity() {
        return this._humidity;
    }
    
    set humidity(value) {
        
        this._humidity = value;
    }
    
   
    get airPressure() {
        return this._airPressure;
    }
    
    set airPressure(value) {
        this._airPressure = value;
    }
    
    
    get updatedDateTime() {
        return this._lastUpdatedDateTime;
    }
    
    set updatedDateTime(value) {
        this._lastUpdatedDateTime = value;
    }
    
    
    get district() {
        return this._district;
    }
    
    set district(value) {
        this._district = value;
    }

}

module.exports = WeatherData;
class ServiceResponse {
    constructor(status, requestedDatetime, data, message) {
        this.status = status;
        this.requestedDatetime = requestedDatetime;
        this.data = data;
        this.message = message
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getRequestedDatetime() {
        return this.requestedDatetime;
    }

    setRequestedDatetime(requestedDatetime) {
        this.requestedDatetime = requestedDatetime;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }

}

module.exports = ServiceResponse;
var common = {};

function ActionResponse(status, errorCode, data) {
	this.status = status;
	this.errorCode = errorCode;
	this.data = data;
};

ActionResponse.SUCCESS = "SUCCESS";
ActionResponse.ERROR = "ERROR";

ActionResponse.method('getStatus' , function() {
	return this.status;
});

ActionResponse.method('getData' , function() {
	return this.data;
});

ActionResponse.method('getObject' , function() {
	return this.data;
});

ActionResponse.method('getErrorCode' , function() {
	return this.errorCode;
});

ActionResponse.method('getJSON' , function() {
	return JSON.stringify({
		"status":this.status,
		"data":this.data,
		"errorCode":this.errorCode
	});
});

common.ActionResponse = ActionResponse;

module.exports = common;
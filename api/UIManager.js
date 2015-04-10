var crockford = require('../lib/crockford');
var ui = {};

function AbstractUIManager() {
	this.appName = "";
	this.baseUrl = "";
};

AbstractUIManager.method('initialize' , function(config) {
	this.appName = config.appName;
	this.baseUrl = config.baseUrl;
});

AbstractUIManager.method('getUIParams' , function(config) {
	var params = {};
	params.appName = this.appName;
	params.baseUrl = this.baseUrl;
	return params;
});

function LoginUIManager() {
	
};

LoginUIManager.inherits(AbstractUIManager);


ui.LoginUIManager = LoginUIManager;

module.exports = ui;
var crockford = require('../lib/crockford');
var ui = {};

function AbstractUIManager() {
	this.appName = "";
	this.baseUrl = "";
};

AbstractUIManager.method('initialize' , function(config) {
	this.appName = config.appName;
	this.baseUrl = config.baseUrl;
	this.logoFileUrl = config.logoFileUrl;
	
	this.twitterUrl = config.twitterUrl;
	this.facebookUrl = config.facebookUrl;
	this.vesion = config.version;
	this.gakey = config.gakey;
});

AbstractUIManager.method('getUIParams' , function() {
	var params = {};
	params.appName = this.appName;
	params.baseUrl = this.baseUrl;
	params.logoFileUrl = this.logoFileUrl;
	params.facebookUrl = this.facebookUrl;
	params.twitterUrl = this.twitterUrl;
	params.version = this.version;
	params.gakey = this.gakey;
	return params;
});

function LoginUIManager() {
	
};

LoginUIManager.inherits(AbstractUIManager);


ui.LoginUIManager = LoginUIManager;

module.exports = ui;
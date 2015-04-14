var ui = {};

function AbstractUIManager() {
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

AbstractUIManager.method('getRequestParams' , function() {
	var params = {};
	return params;
});

function LoginUIManager() {
	
};

LoginUIManager.inherits(AbstractUIManager);

LoginUIManager.method('getRequestParams' , function(req) {
	var params = {};
	//set request params
	if(req.query.key != null && req.query.key != undefined){
		params.key = req.query.key;
	}else{
		params.key = "";
	}
	
	if(req.query.cp != null && req.query.cp != undefined){
		params.changePassword = req.query.cp;
	}else{
		params.changePassword = "";
	}
	
	if(req.query.f != null && req.query.f != undefined){
		params.loginFailed = req.query.f;
	}else{
		params.loginFailed = "";
	}
	
	if(req.query.fm != null && req.query.fm != undefined){
		params.loginFailedMessage = req.query.fm;
	}else{
		params.loginFailedMessage = "";
	}
	
	if(req.query.c != null && req.query.c != undefined){
		params.changeSuccess = req.query.c;
	}else{
		params.changeSuccess = "";
	}
	
	return params;
});

ui.LoginUIManager = LoginUIManager;

module.exports = ui;
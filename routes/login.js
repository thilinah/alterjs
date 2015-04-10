var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	var log = req.app.get('log');
	var ui = require('../api/UIManager');
	var config = require('../config');
	
	var loginUIManager = new ui.LoginUIManager();
	loginUIManager.initialize(config);
	
	var params = loginUIManager.getUIParams();
	
	params.layout = 'loginmain.hbs';
	
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
	
	log.log('info',"login router params "+JSON.stringify(params));
	
	res.render('login', params);
	
});

module.exports = router;

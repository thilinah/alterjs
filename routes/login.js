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
	
	var requestParams = loginUIManager.getRequestParams(req);
	
	params = Object.extend(params,requestParams);
	
	log.log('info',"login router params "+JSON.stringify(params));
	
	res.render('login', params);
	
});

module.exports = router;

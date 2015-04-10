var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	
	var ui = require('../api/UIManager');
	var config = require('../config');
	
	var loginUIManager = new ui.LoginUIManager(config);
	
	var params = loginUIManager.getUIParams();
	
	params.layout = 'loginmain.hbs';
	
	//set request params
	if(req.query.key != null && req.query.key != undefined){
		params.key = req.query.key;
	}else{
		params.key = "";
	}
	
	
	res.render('login', params);
	
});

module.exports = router;

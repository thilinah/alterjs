var express = require('express');
var router = express.Router();

router.get('/echo', function(req, res, next){
	var log = req.app.get('log');
	var config = require('../config');
	
	res.send(req.query.message);
	
});

module.exports = router;

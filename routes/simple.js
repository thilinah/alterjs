var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/simple', function(req, res, next) {
	var that = this;
	res.send("Suscess:"+JSON.stringify(req.query));
});

module.exports = router;

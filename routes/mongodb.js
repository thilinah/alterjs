var express = require('express');
var router = express.Router();

router.get('/mongodb', function(req, res, next){
	
	console.log("Is DB Ready:"+ req.db.readyState);
	
	var db = req.db;
	
	ObjectID = require('mongodb').ObjectID;
	
	var collection = db.collection('Users1');
	collection.find({}).toArray(function(err, docs) {
		var name = "Test";
		var obj = null;
		for(index in docs){
			obj = docs[index];
			for(key in obj){
				console.log(key+":"+obj[key]);
			}
		}
		res.render('simple', {name: JSON.stringify(docs)});
	}); 
	
	
	
});

module.exports = router;
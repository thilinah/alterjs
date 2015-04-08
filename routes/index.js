var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/simple', function(req, res, next){
	/*
	console.log("Testing");
	console.log(req.db.readyState);
	
	new req.db.model.User({id:"2",name:"T2"}).save();
	
	req.db.model.User.find(function (err, users) {
		if (err) return console.error(err);
		console.log(users);
		var data = {name: 'Gorilla'};
		res.render('simple', data);
	});
	*/
	
	/*
	console.log("Testing raw");
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
	  if(err) { return console.dir(err); console.log("Testing 1");}

	  db.collection('Users', function(err, collection) {console.log(collection);});

	  db.collection('Users', {w:1}, function(err, collection) {console.log(collection);});

	  db.createCollection('Users1', function(err, collection) {console.log(collection);});

	  db.createCollection('Users1', {w:1}, function(err, collection) {console.log(collection);});
	  
	  var collection = db.collection('Users1');
	  var doc1 = {'hello':'doc1'};
	  var doc2 = {'hello':'doc2'};
	  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

	  collection.insert(doc1);

	});
	*/
	
	req.db.createCollection('Users2', function(err, collection) {console.log(collection);});
	var collection = req.db.collection('Users2');
	  var doc1 = {'hello':'doc1'};
	  var doc2 = {'hello':'doc2'};
	  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
	  
	  collection.insert(doc1);
	
});

module.exports = router;

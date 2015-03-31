var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/simple', function(req, res, next){
  var data = {name: 'Gorilla'};
  res.render('simple', data);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Activity = require('../models/activity');
var Restaurant = require('../models/restaurant');
var bluebird = require('bluebird');
module.exports = router;



router.get('/', function(req,res,next){
  //query 
  // var hotels = Hotel.findAll();
  // var restaurants = Restaurant.findAll();
  // var activities = Activity.findAll();
  var promises = [Hotel.findAll(), Restaurant.findAll(), Activity.findAll()];

  Promise.all(promises)
    .then(function(results){
      res.render('index', {
      hotels: results[0],
      restaurants: results[1],
      activities: results[2]
    });
      
  });



  
});
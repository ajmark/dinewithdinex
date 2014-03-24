var mongoose = require( 'mongoose' );
var url = require('url');
var passport = require("passport");
//Imports the models
var Offer = mongoose.model( 'Offer' );
var User = mongoose.model('User');

//URL Routes

exports.splash = function (req, res){
  res.render("../views/index.jade",{
    title:"Dine With DineX"
  });
};

exports.create_form = function (req, res){
  res.render("../views/create_form.jade",{
    title:"Make a New Offer"
  });
};

//Facebook Routes
exports.login_success = function(req,res,next){
  res.redirect("/newsfeed")
};

exports.login_error = function(req,res,next){
  res.send("Error logging in.");
};

exports.logout = function(req,res){
  res.redirect("/");
};

//Dashboard Route
exports.user_dashboard = function(req, res){
  Offer.find({"user_id" : req.params.id}, function (err, offers, count){
    res.render("../views/dashboard.jade",{
      title : "User Dashboard",
       offers : offers
    });
  });
};

//User CRUD/////
/////////////////
//Create
exports.create_user = function(req,res){
  new User({
    fb_id : req.body.userID
    }).save(function(err,user,count){
      res.redirect('/dashboard/' + req.body.userID);
    });
};

//Offer CRUD////
/////////////////
//Create
exports.create = function ( req, res ){
  new Offer({
    user_id : req.body.user_id,
    location : req.body.location,
    type : req.body.meal_type,
    price : req.body.price,
    expiration : req.body.expiration,
    created : Date.now()
  }).save( function( err, offer, count ){
    res.redirect( '/newsfeed' );
  });
};

//Read All
exports.newsfeed = function ( req, res ){
  Offer.find( function ( err, offers, count ){
    res.render( '../views/newsfeed.jade', {
        title : 'Offers Newsfeed',
        offers : offers
    });
    console.log(offers == false);
  });
}; 

//Show Offer
exports.show_offer = function (req, res){
  Offer.findOne({'_id' : req.params.id}, function (err, offer){
    res.render('../views/show.jade',{
      title : 'Offer Information',
      offer : offer
    });
  });
};

//Update

//Destroy

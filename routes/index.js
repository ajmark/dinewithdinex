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

exports.show_status = function(req,res){
  Offer.findOne({"_id" : req.params.id},function (err,offer){
    if(!err){
      res.render("../views/offer_status.jade",{
        title:"Show Offer Status",
        offer : offer
      });
    } else {
      res.redirect("/404")
    };
  });
};

//Error Page//////
//////////////////
exports.page_error = function(req,res){
  res.render("../views/404_error.jade",{
    title:"404 Error"
  });
};

//User CRUD/////
/////////////////
//Create
exports.create_user = function(req,res){
  new User({
    fb_id : req.body.userID,
    name : req.body.username
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
    fb_name : req.body.fb_name,
    location : req.body.location,
    type : req.body.meal_type,
    price : req.body.price,
    expiration : req.body.expiration,
    created : Date.now(),
    accepted : false,
    completed : false,
    contact_info : req.body.contact_info,
    buyer_id : null,
    buyer_name : null
  }).save( function( err, offer, count ){
    res.redirect( '/dashboard/' + req.body.user_id );
  });
};

//Read All
exports.newsfeed = function ( req, res ){
  Offer.find({'accepted' : false}, function ( err, offers, count ){
    res.render( '../views/newsfeed.jade', {
        title : 'Offers Newsfeed',
        offers : offers
    });
  });
}; 

//Show Offer
exports.show_offer = function (req, res){
  Offer.findOne({'_id' : req.params.id}, function (err, offer){
    if (!err){
      res.render('../views/show.jade',{
        title : 'Offer Information',
        offer : offer
      });
    } else {
      res.redirect('/404')
    };
  });
};

//Update
exports.get_edit_form = function (req,res){
  Offer.findOne({'_id' : req.params.id}, function (err,offer){
    res.render("../views/edit_form.jade",{
      title:"Edit Offer",
      offer:offer
    });
  });
};

exports.update_offer = function (req,res){
  Offer.findOneAndUpdate({'_id' : req.params.id},req.body, function (err,offer){
    res.redirect('/dashboard/' + req.body.user_id )
  });
};

//Delete
exports.delete_offer = function (req,res){
  Offer.findOneAndRemove({'_id' : req.params.id}, function (err,offer){
    res.redirect('/newsfeed');
  });
};



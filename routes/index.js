var mongoose = require( 'mongoose' );
//Imports the models
var Offer = mongoose.model( 'Offer' );

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


//Offer CRUD

//Create
exports.create = function ( req, res ){
  new Offer({
    user_id : "Joe Schmoe ",
    location : req.body.location,
    type : req.body.meal_type,
    price : req.body.price,
    expiration : req.body.expiration,
    created : Date.now()
  }).save( function( err, offer, count ){
    res.redirect( '/newsfeed' );
  });
};

//Read
exports.newsfeed = function ( req, res ){
  Offer.find( function ( err, offers, count ){
    res.render( '../views/newsfeed.jade', {
        title : 'Offers Newsfeed',
        offers : offers
    });
  });
}; 

//Update

//Destroy

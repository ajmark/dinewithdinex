var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
//Mongoose-Currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
 
var Offer = new Schema({
    user_id : {type: String, required:true},
    fb_name : {type: String, required:true},
    location: {type:String, required:true},
    type  : {type: String, required:true},
    price : {type: Currency, required:true},
    expiration: {type: Number, required:true},
    created  : {type: Date, default:Date.now},
    accepted : Boolean,
    completed : Boolean,
    contact_info : {type: String, required:true},
    buyer_id : {type:String},
    buyer_name : {type:String}
});
 
//Formats the price of offer to user friendly format
Offer.methods.fixedPrice = function(callback) {
	var price = this.price;

	return (price/100.00).toFixed(2);
};

//Formats the day of when the offer was created
Offer.methods.formatDay = function(callback) {
	var day = this.created.getDay();
	var weekdays = {0:"Monday",1:"Tuesday",2:"Wednesday",3:"Thursday",4:"Friday",5:"Saturday",6:"Sunday"};
	return weekdays[day]
};

//formats the date of when offer was created
Offer.methods.formatDate = function(callback) {
	var date = this.created.getDate()
	, year = this.created.getFullYear()
	, month = this.created.getMonth();

	var map = {0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"};

	var datestring = map[month] + ", " + date + "  " + year;
	return datestring; 
}

//formats the time of when the offer was created
Offer.methods.formatTime = function(callback) {
	//puts the time in 12 hour format
	if (this.created.getHours() === 0){
		var hour = 12; 
	}
	else if (this.created.getHours() > 12){
		var hour = this.created.getHours() % 12;
	}
	else {
		var hour = this.created.getHours();
	}

	//sets the time in hh:mm format
	if (this.created.getMinutes() < 10){
		var minute = "0" + this.created.getMinutes();
	}
	else {
		var minute = this.created.getHours();
	}

	return hour + ":" + minute; 
}

mongoose.model( 'Offer', Offer );
 

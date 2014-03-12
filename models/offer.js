var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
//Mongoose-Currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
 
var Offer = new Schema({
    user_id : {type: String, required:true},
    location: {type:String, required:true},
    type  : {type: String, required:true},
    price : {type: Currency, required:true},
    expiration: {type: Number, required:true},
    created  : {type: Date, default:Date.now}
});
 
mongoose.model( 'Offer', Offer );
 

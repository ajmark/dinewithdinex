var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Offer = new Schema({
    username : String,
    content  : String,
    created  : Date
});
 
mongoose.model( 'Offer', Offer );
 

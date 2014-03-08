var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var User = new Schema({
    user_id : String,
    location  : String,
    name  : String
});
 
mongoose.model( 'User', User );
 

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var User = new Schema({
    fb_id : {type: Number, required:true, unique:true}
});
 
mongoose.model( 'User', User );
 

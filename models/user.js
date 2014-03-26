var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var User = new Schema({
    fb_id : {type: Number, required:true, unique:true},
    name : {type: String, require:true}
});
 
mongoose.model( 'User', User );
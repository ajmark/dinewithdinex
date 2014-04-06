var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var User = new Schema({
    fb_id : {type: Number, required:true, unique:true},
    name : {type: String, require:true}
});
 
 User.methods.firstName = function (callback){
    var name = this.name.split(" ")
    return name[0]
 }
mongoose.model( 'User', User );
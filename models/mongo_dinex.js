var util = require("util");
var mongoClient = require("mongodb").MongoClient;
var server = "mongodb://localhost:27017/";

//db/:collection/:operation/:document
var doError = function(e) {
        util.debug("ERROR: " + e);
        throw new Error(e);
    }
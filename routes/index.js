var mongo = require("../models/mongo_dinex.js");

exports.splash = function(req, res){
  res.render('../views/index.ejs', {title:"splash"});
};
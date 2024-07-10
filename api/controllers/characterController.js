var {Character } = require("../models/wuwaModel");


exports.getCharacter = function(req, res){
    var query = { sort: { character_name: 1 } }
    Character.find({}, null, query,  function(err, character){
              if(err) throw err
              res.json({character})
            })
  }
'use strict'
var mongoose = require('mongoose')
var { Login, Character } = require("../models/wuwaModel");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

exports.getAllCharacter = function (req, res) {
  Character.find({}, function (err, characters) {
    if (err) throw err
    res.json({characters, message: "All character information retrieved successfully"})
  })

}

exports.getACharacter = function (req, res) {
  Character.findById(req.params.id, function (err, character) {
    if (err) throw err
    res.status(200).json({character, message: "Character information retrieved successfully" })
  })
}

exports.getAChabycount = function (req, res) {
  //var query = { sort: { count : -1 } }
  const pipeline = [
    { $unwind: '$character_list'  },
    { $group: { _id: '$character_list', count: { $sum: 1 } } } ,
    { $sort: { count: -1 } }
  ];
  
  Login.aggregate(pipeline)
  .exec(function (err, characters) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
    res.json(characters);
  });

}
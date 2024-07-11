'use strict'
var mongoose = require('mongoose')
var { Login, Character, Event } = require("../models/wuwaModel");
const jwt = require('jsonwebtoken')


//function to create user, create jwt token and return the token to the frontend
exports.createAUser = function (req, res) {
  var newUser = new Login(req.body)
  newUser.character_list = ["Rover (Male)", "Rover (Female)", "Chixia", "Yangyang", "Baizhi"]
  newUser.save(function (err, user) {
    if (err) throw err
    else console.log(user)
  })
  jwt.sign({ newUser }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
    if (err) { console.log(err) }
    res.status(200).json({ token })
    //res.status(200).send("Signup successful")
  })
}

//function to verify the user
//the function will check if the username or the email of the user and the password match the existing user
//then it will create jwt token and return the token to the frontend
exports.verifyAUser = function (req, res) {

  const { account, password } = req.body;

  Login.findOne({ $or: [{ username: account, password: password }, { email: account, password: password }] }, function (err, user) {

    if (!user) {
      res.status(401).send('Invalid username or password');
      return;
    }
    if (err) {
      console.error(err)
      res.status(500).send('Server error');
      return;
    }

    jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
      if (err) { console.log(err) }
      res.status(200).json({ user, token })
    })

  })
}


//function to query every users in the database (for admin)
exports.getAllUser = function (req, res) {
  var query = { sort: { email: 1 } }
  Login.find({}, null, query, function (err, user) {
    if (err) throw err
    //console.log(event)
    res.json(user)
  })
}

//function to get the user information by id
exports.getAUser = function (req, res) {
  Login.findById(req.params.id, function (err, user) {
    if (err) throw err
    res.json({ user, message: 'Successfully get user' })
  })
}

//function to get the top pick characters of the user using aggregate to query
exports.getUserCharacter = function (req, res) {
  const excludedCharacters = ["Rover (Male)", "Rover (Female)", "Chixia", "Yangyang", "Baizhi"]
  Login.aggregate([
    { $unwind: "$character_list" },
    {
      $group: {
        _id: "$character_list",
        count: { $sum: 1 }
      }
    },
    { $match: { _id: { $nin: excludedCharacters } } },
    { $sort: { count: -1 } },
    { $limit: 4 }
  ]).exec((err, result) => {
    if (err) throw err
    const characterCounts = {};
    result.forEach(character => {
      characterCounts[character._id] = character.count;
    });

    res.status(200).json(characterCounts);
  })
}

//function to update the user information by id
exports.updateAUser = function (req, res) {
  var newUser = {}
  newUser = req.body
  console.log(newUser)
  Login.findByIdAndUpdate(req.params.id, newUser, { new: true }, function (err, user) {
    if (err) throw err
    console.log(user)
    res.json(user)
  })
}

//function to get all news and events from the database
exports.getAllEvents = function (req, res) {
  var query = { sort: { events_name: 1 } }
  Event.find({}, null, query, function (err, event) {
    if (err) throw err
    //console.log(event)
    res.json(event)
  })
}


//function to get the detail of specific news or event by id
exports.getAEvent = function (req, res) {
  Event.findById(req.params.id, function (err, event) {
    if (err) throw err
    res.json({ event, message: 'Successfully get event' })
  })
}
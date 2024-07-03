'use strict'
var mongoose = require('mongoose')
var { Login, Character } = require("../models/wuwaModel");
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")

exports.createAUser = function(req, res){
    var newUser = new Login(req.body)
    newUser.save(function(err, user){
        if(err) throw err
        else res.json(user)
    })
    jwt.sign({newUser}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      if(err) { console.log(err) }    
      res.cookie("access-token", token, {
        maxAge: 60*60,
        httpOnly: true
      })
      //res.status(200).send("Signup successful")
    })
}

exports.verifyAUser = function(req, res) {
    
    const { account, password } = req.body;

    Login.findOne({$or: [{username: account, password: password},{email: account, password: password}]}, function(err, user) {
  
      if (!user) {
        res.status(401).send('Invalid username or password');
        return;
      }
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }

      jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
        if(err) { console.log(err) }    
        res.cookie("access-token", token, {
          maxAge: 60*60,
          httpOnly: true
        })
        res.status(200).send("Signin successful")
      })

    })
  }

exports.getAUser = function(req, res, next){
  const accessToken = req.cookies["access-token"]

  if (!accessToken)
  return res.status(400).json({ error: "User not Authenticated"})

  try{
    jwt.verify(accessToken, "privatekey", function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
          req.authenticated = true
          User.findById(req.params.userId, function(err, user){
            if(err) throw err
            res.json(user)
          })
        }
      })
    }
  catch(err){
    return res.status(400).json({ error: err})
  }
}

exports.updateAUser = function(req, res){
    var newUser = {}
    newUser = req.body
    console.log(newUser)
    const accessToken = req.cookies["access-token"]

  if (!accessToken)
  return res.status(400).json({ error: "User not Authenticated"})

  try{
    jwt.verify(accessToken, "privatekey", function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
          req.authenticated = true   
          User.findByIdAndUpdate(req.params.id, newUser, {new: true}, function(err, user){
            if(err) throw err
            console.log(user)
            res.json(user)
          })
        }
      })
    }
  catch(err){
    return res.status(400).json({ error: err})
  }
}
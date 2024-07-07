'use strict'
var mongoose = require('mongoose')
var { Login, Character } = require("../models/wuwaModel");
const jwt = require('jsonwebtoken')


exports.createAUser = function(req, res){
    var newUser = new Login(req.body)
    newUser.character_list = ["Rover (Male)", "Rover (Female)", "Chixia", "Yangyang", "Baizhi"]
    newUser.save(function(err, user){
        if(err) throw err
        else console.log(user)
    })
    jwt.sign({newUser}, 'privatekey', { expiresIn: '1h' },(err, token) => {
      if(err) { console.log(err) }    
      res.status(200).json({ token })
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
        console.error(err)
        res.status(500).send('Server error');
        return;
      }

      jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
        if(err) { console.log(err) }    
        res.status(200).json({token})
      })

    })
  }

exports.getAUser = function(req, res){
  Login.findById(req.params.id, function(err, user){
            if(err) throw err
            res.json({user, message: 'Successfully get user'})
          })
}

exports.updateAUser = function(req, res){
    var newUser = {}
    newUser = req.body
    console.log(newUser)
    Login.findByIdAndUpdate(req.params.id, newUser, {new: true}, function(err, user){
      if(err) throw err
      console.log(user)
      res.json(user)
    })
}
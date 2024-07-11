'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//schema of user including email, password, username and the array of character names which user owned
var LoginSchema = new Schema({
    email: {
        type: String,
        Required: 'Please enter'
    },
    password: {
        type: String,
        Required: 'Please enter'
    },
    username: {
        type: String,
        Required: 'Please enter'
    },
    character_list: {
        type: [String]
    }

},
{ collection: 'Users' }
)

//schema of character in the game including the detail of the character
var CharacterSchema = new Schema({
    character_name: {
        type: String,
        Required: 'Please enter'
    },
    character_desc: {
        type: String,
        Required: 'Please enter'
    },
    weapon: {
        type: String,
        Required: 'Please enter'
    },
    element: {
        type: String,
        Required: 'Please enter'
    },
    gender: {
        type: String,
        Required: 'Please enter'
    },
    rarity: {
        type: Number,
        Required: 'Please enter'
    },
    type: {
        type: String,
        Required: 'Please enter'
    }

},
{ collection: 'Characters' }
)

//schema of news in the game including the detail of the news
var EventSchema = new Schema({
    events_name: {
        type: String,
        Required: 'Please enter'
    },
    events_desc: {
        type: String,
        Required: 'Please enter'
    },
    date: {
        type: String,
        Required: 'Please enter'
    },
    events_type: {
        type: String,
        Required: 'Please enter'
    }

},
{ collection: 'Events' }
)


module.exports = {
    Login: mongoose.model('Login', LoginSchema),
    Character: mongoose.model('Character', CharacterSchema),
    Event: mongoose.model('Event', EventSchema)
}

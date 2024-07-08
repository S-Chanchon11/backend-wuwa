'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

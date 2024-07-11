'use strict'

const { verifyToken } = require('../controllers/verifyToken')

module.exports = function(app){
    var wuwa = require('../controllers/wuwaController')

    //route to signup the user
    app.post('/auth/register', wuwa.createAUser)

    //route to login the user
    app.post('/auth/login', wuwa.verifyAUser)

    //route to get the user information by id (need to verify the jwt token before access the function)
    app.get('/users/:id', verifyToken, wuwa.getAUser)

    //route to get all the users (for admin)
    app.get('/users',wuwa.getAllUser)

    //route to get the top pick characters
    app.get('/home',wuwa.getUserCharacter)

    //route to update the user information by id (need to verify the jwt token before access the function)
    app.put('/users/:id', verifyToken, wuwa.updateAUser)

    //route to get all the news and events
    app.get('/events', wuwa.getAllEvents)

    //route to get the news or event by id
    app.get('/events/:id',  wuwa.getAEvent)
}
'use strict'

const { verifyToken } = require('../controllers/verifyToken')

module.exports = function(app){
    var wuwa = require('../controllers/wuwaController')

    app.post('/auth/register', wuwa.createAUser)

    app.post('/auth/login', wuwa.verifyAUser)

    app.get('/users/:id', verifyToken, wuwa.getAUser)

    app.get('/users',wuwa.getAllUser)

    app.get('/home',wuwa.getUserCharacter)

    app.put('/users/:id', verifyToken, wuwa.updateAUser)

    app.get('/events', wuwa.getAllEvents)

    app.get('/events/:id',  wuwa.getAEvent)
}
'use strict'

const { verifyToken } = require('../controllers/verifyToken')

module.exports = function(app){
    var wuwa = require('../controllers/wuwaController')

    app.post('/auth/register', wuwa.createAUser)

    app.post('/auth/login', wuwa.verifyAUser)

    app.get('/users/:id', verifyToken, wuwa.getAUser)

    app.put('/users/:id', verifyToken, wuwa.updateAUser)

    app.get('/events', verifyToken, wuwa.getAllEvents)

    app.get('/events/:id', verifyToken, wuwa.getAEvent)
}
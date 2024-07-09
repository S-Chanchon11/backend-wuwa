'use strict'

const { verifyToken } = require('../controllers/verifyToken')

module.exports = function(app){
    var wuwa = require('../controllers/wuwaController')

    var cha = require('../controllers/characterController')

    app.post('/auth/register', wuwa.createAUser)

    app.post('/auth/login', wuwa.verifyAUser)
 
    app.get('/users/:id', verifyToken, wuwa.getAUser)

    app.put('/users/:id', verifyToken, wuwa.updateAUser)

    app.get('/characters', cha.getAllCharacter)

    app.get('/characters/:id', cha.getACharacter)
        
    app.get('/home', cha.getAChabycount)
    
}
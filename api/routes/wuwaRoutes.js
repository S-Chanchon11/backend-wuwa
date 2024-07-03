'use strict'
module.exports = function(app){
    var wuwa = require('../controllers/wuwaController')

    app.route('/auth/register')
        .post(wuwa.createAUser)

    app.route('/auth/login')
        .post(wuwa.verifyAUser)

    app.route('/users/:id')
        .get(wuwa.getAUser)

    app.route('/users/:id')
        .put(wuwa.updateAUser)
}
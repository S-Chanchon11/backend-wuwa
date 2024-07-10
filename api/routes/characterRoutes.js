module.exports = function(app){
    var characterList = require('../controllers/characterController')

    app.route('/characters').get(characterList.getCharacter)
}
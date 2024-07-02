var express = require('express')
var cors = require('cors')
mongoose = require('mongoose')
bodyParser = require('body-parser')

app = express()
app.use(cors())

port = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect('', function (error) {
    if (error) throw error
    console.log('Successfully connected');
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.listen(port)

console.log('listen on : ' + port)


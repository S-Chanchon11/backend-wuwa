var express = require('express')
var cors = require('cors')
mongoose = require('mongoose')
bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

app = express()
app.use(cors())
app.use(cookieParser())

port = process.env.PORT || 3427

User = require('./api/models/wuwaModel')

mongoose.Promise = global.Promise

mongoose
  .connect('mongodb+srv://penguin:lolipop@contactlist.coqmsx1.mongodb.net/Project')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  })

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require('./api/routes/wuwaRoutes.js')
var character_routes = require('./api/routes/characterRoutes.js')
routes(app)
character_routes(app)

app.listen(port)

console.log('listen on : ' + port)


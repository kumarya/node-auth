const mongoose = require("mongoose")
const passport = require("passport")

const authentication = require("./controllers/authentication")
const passportService = require("./services/passport")


const requireAuth = passport.authenticate('jwt', {session:false})

const requireSignin = passport.authenticate('local', {session:false})


module.exports = (app)=>{

  app.get('/', requireAuth, (req, res)=>{

    res.send({hi:'there'})

  })

  app.post('/signin', requireSignin, authentication.signin)

  app.post('/signup', authentication.signup)





}

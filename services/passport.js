const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt
const LocalStrategy = require("passport-local")

const User = require("../models/user")
const config = require("../config")


//create local Login

const localLogin = new LocalStrategy({usernameField:'email' }, function(email, password, done){
  User.findOne({email:email}, (err, user)=>{
    if(err){return done(err)}
    if(!user){return done(null, false)}

    user.comparePassword(password, function(err, isMatch){
      if(err){return done(err)}
      if(!isMatch){return done(null, false)}

      return done(null, user)
    })


  })
})


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey:config.secret
};


const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.id, function(err, user){
    if(err) {return done(err, false)}
    if(user){
      done(null, user)
    } else {
      done(null, false)
    }

  })

})
passport.use(jwtLogin);
passport.use(localLogin)

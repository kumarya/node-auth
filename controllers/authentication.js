const jwt = require("jsonwebtoken")
var User = require('../models/user')
var config = require("../config")


function tokenforUser(user){

  const timestamp = new Date().getTime();
  return jwt.sign({id:user.id, iat:timestamp}, config.secret)
}

exports.signin = (req, res, next)=>{
  console.log(req.body)
  res.send({token:tokenforUser(req.user)})
}

exports.signup = (req, res, next)=>{

  const email = req.body.email

  const password = req.body.password

  if(!email || !password){
    return res.status(422).send({error:'you must provide a email and password'})
  }

  User.findOne({email:email}, (err, existingUser)=>{
    if(err){
      return next(err)
    }

    if(existingUser){
      return res.status(422).send({error:'already emailuse'})
    }


    const user = new User({
      email:email,
      password:password
    })
    user.save((err)=>{
      if(err){
        return next(err)
      }
      res.json({token:tokenforUser(user)})

    })
  })
}

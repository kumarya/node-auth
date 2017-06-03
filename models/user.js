const mongoose = require("mongoose");
var bcrypt = require('bcryptjs')



// define our Model
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type:String,
    unique:true,
    lowercase:true
  },
  password:String
})

// bcrypt and salt

userSchema.pre('save', function(next){
  const user = this

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        if(err){return next(err)}
        user.password = hash
        next()

    });
  });
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err)}
    callback(null, isMatch)
  })
}

//create the Model Class

var User = mongoose.model('user', userSchema)



//export the Model

module.exports = User

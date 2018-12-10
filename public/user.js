var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema ({
  username : {
    type: String,
    required: true,
    trim: true
    },
  password : {
    type: String,
    required: true,
    },
  email : {
    type: String,
    unique: true,
    required: true,
    trim: true
    },
  age : Number,
  pokemon : String,
  type : Boolean,
  eyes : String
});

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({email: email})
  .exec(function (error, user) {
    if (error) {
      return callback(error);
    } else if (!user) {
      var err = new Error('User Not Found');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(error, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  })
}

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(error, hash) {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);

module.exports = User;
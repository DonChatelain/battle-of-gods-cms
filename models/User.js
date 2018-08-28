const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Number,
    required: false,
  }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      })
    })
  } else {
    return next();
  }
})

UserSchema.methods.comparePassword = function (pass, done) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  })
}

UserSchema.methods.getIsAdmin = function () {
  return this.admin === 1;
}

module.exports = UserSchema;
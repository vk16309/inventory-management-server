const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SaltRounds = 10;
const UserModel = mongoose.model('User', UserSchema);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


// pre save hook for the model (save hash instead of the password)
UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  }
  else next();
});

// method to compare candidate password against the hash
UserSchema.methods.comparePassword = function (cadidatePassword, cb_function) {
  bcrypt.compare(cadidatePassword, this.password, function (err, res) {
    if (err) return cb_function(err);

    cb_function(null, res);
  });
};

module.exports = UserModel;
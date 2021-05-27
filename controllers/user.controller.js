const SECRET_KEY = process.env.SECRET_KEY || require('../server-config.json').server_secret || "JustSomethingSecret";
const User = require('../models/user.model');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

const attach_id = (req, res, next) => { // if a jwt token is in the request .. the correct use id will be attached to req object
  
  req.id = undefined;
  req.username = undefined;
  req.email = undefined;

  if(req.token)
  {
    try {
      let actual_token = req.token.substr(7); 
      jwt.verify(token, SECRET_KEY); // synchronously verify token
      let decoded_payload = jwt.decode(actual_token) // synchronously decode payload

      req.id = decoded_payload.id;
      req.username = decoded_payload.username;
      req.email = decoded_payload.email;
      next();
    }
    catch {
      next();
    }    
  }
  else
  {
    next();
  }

};

const register = (req, res) => {

  console.log(req.body);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({success: false, message: "Email ID already registered" });
      } 

      else {
        const newUser = new User(req.body);
        newUser.save((err, doc) => {
          if (err) 
          {
            res.status(400).json({success: false, message: "DB Error"});
            console.log(err)
          }
          else
            res.status(200).json({
              success: true,
              message: "Account created"
            })
        });
      }
    })
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // return faliure if email not registered
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({success: false, message: "User not found" });
    }

    // Compare password
    bcrypt.compare(password, user.password).then(isMatch => {

      if (isMatch) {  // if password matched .. sign and send the token
        const payload = { username: user.username, email: user.email, id: user.id };

        jwt.sign(
          payload, SECRET_KEY, { expiresIn: 3600 * 24 * 3 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user:user
            });
          }
        );
      }

      else { // if the password doesn't match
        res.status(400).json({ success: false, message: "Password Incorrect" });
      }

    });
  });
};




const test = (req, res) => {
  res.json({ message: "This is user controller" })
};

module.exports = {
  register,
  login,
  attach_id,
  test,
 
}

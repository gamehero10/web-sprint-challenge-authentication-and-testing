const router = require('express').Router();
const { JWT_SECRET } = require("../../secrets/index"); // use this secret!
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkNewUser, validateCredentials} = require('./auth-middleware');
const Users = require('../../users/user-model');


router.post('/register', checkNewUser, validateCredentials , async (req, res, next) => {
  res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken". 
  */
 
  try {
  const {username, password} = req.body;
      const user = await Users.getByUsername(username)
      if(user) {
        return next({status: 409, message: "username taken"});
      } else if(!req.body.username || !req.body.password) {
        return next({status: 400, message: "username and password required"});
      }

      const newUser = await Users.createUser({
        username,
        password: await bcrypt.hashSync(password, 8)
      })
      res.status(201).json(newUser);

  } catch(err) {
    next(err);
  }
    

});

router.post('/login', validateCredentials, async (req, res, next) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

      try {
        const { username, password } = req.body
        const user = await Users.findByUsername(username)
    
        if(!user) {
          return res.status(401).json({
            message: "Invalid credentials"
          })
        }
    
        const passwordValid = await bcrypt.compare(password, user.password)
    
        if (!passwordValid) {
          return res.status(401).json({
            message: "Invalid credentials"
          })
        }
    
        const token = jwt.sign({
          userID: user.id,
        }, process.env.JWT_SECRET)
    
        res.cookie("token", token)
    
        res.json({
          message: `welcome, ${user.username}!`
        })
      } catch(err) {
        next(err)
      }
    
   
    

      /*if(bcrypt.compareSync(req.body.password, req.user.password)) {
           const token = buildToken(req.user);
           res.json({
            message: `welcome, ${req.user.username}`,
            token
           })
      } else {
           next({status: 401, message: "invalid credentials"});
      } */
});


/*function buildToken(user) {
   const payload = {
    subject: user.id,
    username: user.username,
    password: user.password
   }
   const options = {
    expiresIn: '1d'
   }
   return jwt.sign(payload, JWT_SECRET, options);
} */

module.exports = router;

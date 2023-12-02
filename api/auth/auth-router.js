const router = require('express').Router();
const { JWT_SECRET } = require("../../secrets/index"); // use this secret!
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkNewUser,  validateCredentials} = require('./auth-middleware');
const Users = require('../../users/user-model');


router.post('/register', validateCredentials, checkNewUser , async (req, res, next) => {
  //res.end('implement register, please!');
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
    const user = await Users.createUser({
      username: username,
      password: bcrypt.hashSync(password, 8)
    })
    console.log(user);
    res.status(201).json(user);

  } catch (err) {
     next(err);
  }
    

});

router.post('/login', validateCredentials, async (req, res, next) => {
  //res.end('implement login, please!');
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
        const user = await Users.getByUsername(username)
    
        if(!user) {
          return res.status(401).json({
            message: "invalid credentials"
          })
        }
    
        const passwordValid =  bcrypt.compareSync(password, user.password)
    
        if (!passwordValid) {
          return res.status(401).json({
            message: "invalid credentials"
          })
        }
    
        const token = buildToken(user)
    
       
    
        res.json({
          message: `welcome, ${user.username}`,
          token
        })
      } catch(err) {
        next(err)
      }

     
});


function buildToken(user) {
   const payload = {
    subject: user.id,
    username: user.username,
    password: user.password
   }
   const options = {
    expiresIn: '1d'
   }
   return jwt.sign(payload, JWT_SECRET, options);
} 

module.exports = router;

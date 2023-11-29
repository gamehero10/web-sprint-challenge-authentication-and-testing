const Users = require('../../users/user-model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../../secrets/index');





async function checkNewUser(req, res, next)  {
    const user = await Users.getByUsername(req.body.username);
   
    if(user) {
        res.status(400).json({message: "username taken"});
    } else {
        next();
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, options);
}


async function authenticateUser(req, res, next) {
    const user = await Users.getByUsername(req.body.username);
 
    if(user === undefined) {
       return res.status(404).json({message: "invalid credentials"});
    }

    const providedPassword = req.body.password;
    const hashedPasswordFromDb = user.password;

    if(bcrypt.compareSync(providedPassword, hashedPasswordFromDb)) {
        const token = generateToken(user);
        res.json({message: `welcome ${user.username}`, token: token});
    } else {
        res.status(403).json({message: "invalid credentials"});
    }

}



async function validateCredentials(req, res, next) {
    if(req.body.username && req.body.password) {
       next();
    }  else {
       res.status(400).json({message: "username and password required"});
    }
}













module.exports = {
checkNewUser,
authenticateUser,
validateCredentials
}
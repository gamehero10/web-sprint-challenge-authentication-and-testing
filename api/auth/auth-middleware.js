const Users = require('../../users/user-model');






async function checkNewUser(req, res, next)  {
    const user = await Users.getByUsername(req.body.username);
   
    if(user) {
        res.status(400).json({message: "username taken"});
    } else {
        next();
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
validateCredentials
}
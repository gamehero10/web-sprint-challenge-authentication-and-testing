const db = require('../data/dbConfig');




async function createUser(user) {
  await db('users').insert(user)
}

async function getByUsername(username) {
   return db('users as u')
   .where('u.username', username)
   .first()
}






module.exports = {
    createUser,
    getByUsername
}
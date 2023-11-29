const db = require('../data/dbConfig');



async function createUser(user) {
    const [id] = await db('users').insert(user);
    return db('users').where({id}).first();
}

async function getByUsername(username) {
    const name = await db('users').where({username: username}).fiest();
    return name;
}






module.exports = {
    createUser,
    getByUsername
}
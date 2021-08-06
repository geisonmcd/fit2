const database = require('../infra/database');
const moment = require(`moment`);

const addUser = async function (user) {
    console.log('chegou aqui')
    await database.none(`INSERT INTO fit.user(name, username, password, role) VALUES($1, $2, $3, $4)`, [user.name, user.username, user.password, user.role]);
};

module.exports = {
    addUser
};
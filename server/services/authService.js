const database = require('../infra/database');
const moment = require(`moment`);

const login = async function (username, password) {
    let user = await database.oneOrNone(`select * from fit.user where username ilike '%${username}%' and password like '${password}'`);
    console.log({user});
    if (!user) {
        throw new Error();
    }
    return { ...user, token: user.idUser + "-token"}
};

const getSession = async function (username, password) {
    console.log({username});
    let user = await database.oneOrNone(`select * from fit.user where username ilike '%${username}%'`);
    console.log({user});
    if (!user) {
        throw new Error();
    }
    return { ...user, token: user.idUser + "-token"}
};


module.exports = {
    login,
    getSession
};
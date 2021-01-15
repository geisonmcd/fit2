const config = require('../infra/config');
const caseParser = require('caseparser');

const options = {
    pgFormatting: true,
    receive: function (data, result, e) {
		result.rows = caseParser.snakeToCamel(result.rows);
    },
    error(err, e) {
        console.log(err);
        if (e.query) {
            console.log(`erro na query: ${e.query}`);
            if (e.params) {
                console.log(e.params);
            }
        }
    }
};

let poolConfig = {
    user: config.database.user,
    database: config.database.db,
    password: config.database.pw,
    host: config.database.host,
    port: config.database.port,
    max: config.database.maxConnections,
    idleTimeoutMillis: config.database.idleTimeoutMillis
};

const pgp = require('pg-promise')(options);

pgp.pg.types.setTypeParser(1700, (value) => {
    return parseFloat(value);
});

pgp.pg.defaults.poolSize = 5;

module.exports = pgp(poolConfig); 

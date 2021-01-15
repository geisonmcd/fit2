const database = require('../infra/database');

const saveTimetable = async function (timetable){
    try {
        console.log('ta salvando agora');
        console.log(1,2,5, timetable);
        let algo = await database.query(`select * from fit.timetable`);
        console.log('hey : ', algo);
        return database.none(`insert into fit.timetable (name) values ($1)`, [timetable.name])
    } catch (error) {
        console.log(error);
    }
};

// const updateInstitution = function (idInstitution, institution) {
//     database.none(`update institution set name = $2 where id_institution = $1`, [idInstitution, institution.name]);
// };

const getTimetables = function () {
    return database.query(`select * from fit.timetable`);    
};

// const deleteInstitution = async function (idInstitution) {
//     const review = await database.oneOrNone(`select * from review where id_institution = $1`, [idInstitution]);
//     if (review) await database.none('delete from review where id_review = $1', [review.idReview]);
//     database.none(`delete from institution where id_institution = $1`, [idInstitution]);
// };

module.exports = {
    saveTimetable,
    getTimetables
    // updateInstitution,
    // getInstitutions,
    // deleteInstitution,
};
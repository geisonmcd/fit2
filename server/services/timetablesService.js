const database = require('../infra/database');

const saveTimetable = async function (timetable){
    try {
        let algo = await database.query(`select * from fit.timetable`);
        return database.none(`insert into fit.timetable (name) values ($1)`, [timetable.name])
    } catch (error) {
        console.log(error);
    }
};

const saveTimetableSlot = async function (timetableSlot){
    try {
        return database.none(`insert into fit.timetable_slot (id_timetable, start_time, end_time) values ($1, $2, $3)`, [timetableSlot.idTimetable, timetableSlot.startTime, timetableSlot.endTime]);
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

const getTimetableSlots = function (idTimetable) {
    return database.query(`select * from fit.timetable_slot where id_timetable = $1`, [idTimetable]);    
};

const deleteTimetableSlot = function (idTimetableSlot) {
    return database.none(`delete from fit.timetable_slot where id_timetable_slot = $1`, [idTimetableSlot]);
}

// const deleteInstitution = async function (idInstitution) {
//     const review = await database.oneOrNone(`select * from review where id_institution = $1`, [idInstitution]);
//     if (review) await database.none('delete from review where id_review = $1', [review.idReview]);
//     database.none(`delete from institution where id_institution = $1`, [idInstitution]);
// };

module.exports = {
    saveTimetable,
    getTimetables,
    saveTimetableSlot,
    getTimetableSlots,
    deleteTimetableSlot
    // updateInstitution,
    // getInstitutions,
    // deleteInstitution,
};
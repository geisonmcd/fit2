const database = require('../infra/database');
const moment = require(`moment`);

const generateClasses = async function (idTimetable, startDateString, endDateString){
    let slots = await database.query(`select * from fit.timetable_slot where id_timetable = $1`, [idTimetable]);
    let startDate = moment(startDateString);
    let endDate = moment(endDateString);
    let startTime;
    let endTime;
    for (startDate; startDate.isSameOrBefore(endDate); startDate.add(1, 'days')) {
       for(let slot of slots) {
           startTime = moment.utc(slot.startTime);
           endTime = moment.utc(slot.endTime);
           startTime.set('date', startDate.get('date'))
           startTime.set('month', startDate.get('month'))
           endTime.set('date', startDate.get('date'))
           endTime.set('month', startDate.get('month'))
           await database.none(`insert into fit.class (name, start_time, end_time) values ($1, $2, $3)`, [null, startTime, endTime]);
       }
    }
};

const getClasses = async function () {
    return database.query("select * from fit.class")
}

const getClassesByDate = async function (date) {
    return database.query(`select * from fit.class where start_time::date = $1`, [moment(date).format('yyyy-MM-DD')])
}

const lock = async function (date) {
    return database.none(`update fit.class set locked = true where start_time::date = $1`, [moment(date).format('yyyy-MM-DD')])
}

const unlock = async function (date) {
    return database.none(`update fit.class set locked = false where start_time::date = $1`, [moment(date).format('yyyy-MM-DD')])
}

module.exports = {
    generateClasses,
    getClasses,
    getClassesByDate,
    lock,
    unlock
};
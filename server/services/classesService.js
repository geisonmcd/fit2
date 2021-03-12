const database = require('../infra/database');
const moment = require(`moment`);

const generateClasses = async function (idTimetable, startDateString, endDateString){
    let slots = await database.query(`select * from fit.timetable_slot where id_timetable = $1`, [idTimetable]);
    console.log({slots});
    let startDate = moment(startDateString);
    let endDate = moment(endDateString);
    let startTime;
    let endTime;
    for (startDate; startDate.isSameOrBefore(endDate); startDate.add(1, 'days')) {
       for(let slot of slots) {
           startTime = moment(slot.startTime);
           endTime = moment(slot.endTime);
           startTime.set('date', startDate.get('date'))
           startTime.set('month', startDate.get('month'))
           endTime.set('date', endDate.get('date'))
           endTime.set('month', endDate.get('month'))
           await database.none(`insert into fit.class (name, start_time, end_time) values ($1, $2, $3)`, [null, startTime, endTime]);
       }
    }
};

module.exports = {
    generateClasses,
};
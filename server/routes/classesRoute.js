const express = require('express');
const router = express.Router({ mergeParams: true });
const timetablesService = require('../services/timetablesService');
const classesService = require('../services/classesService');

router.post('/generateClasses', async function (req, res) {
    const { idTimetable, startDate, endDate } = req.body;
    await classesService.generateClasses(idTimetable, startDate, endDate);
    res.end();
});

router.get('/', async function (req, res) {
    const timetables = await timetablesService.getTimetables();
    res.json(timetables);
});

router.post('/:idTimetable/timetableSlots', async function (req, res) {
    const timetableSlot = req.body;
    await timetablesService.saveTimetableSlot(timetableSlot);
    res.end();
});

router.get('/:idTimetable/timetableSlots', async function (req, res) {
    const timetables = await timetablesService.getTimetableSlots(req.params.idTimetable);
    res.json(timetables);
});

router.delete('/:idTimetable/timetableSlots/:idTimetableSlot', async function (req, res) {
     await timetablesService.deleteTimetableSlot(req.params.idTimetableSlot);
    res.end();
});

module.exports = router;
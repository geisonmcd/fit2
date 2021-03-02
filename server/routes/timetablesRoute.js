const express = require('express');
const router = express.Router({ mergeParams: true });
const timetablesService = require('../services/timetablesService');

router.post('/', async function (req, res) {
    const timetable = req.body;
    await timetablesService.saveTimetable(timetable);
    res.json({ ...timetable, sucesso: 'sucesso' });
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
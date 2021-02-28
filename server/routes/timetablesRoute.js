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

module.exports = router;
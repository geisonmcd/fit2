const express = require('express');
const router = express.Router({ mergeParams: true });
const timetablesService = require('../services/timetablesService');
const classesService = require('../services/classesService');

router.post('/generateClasses', async function (req, res) {
    const { idTimetable, startDate, endDate } = req.body;
    await classesService.generateClasses(idTimetable, startDate, endDate);
    res.end();
});

router.post('/lock', async function (req, res) {
    const date = new Date(req.query.date);
    await classesService.lock(date);
    res.end();
});

router.post('/unlock', async function (req, res) {
    const date = new Date(req.query.date);
    await classesService.unlock(date);
    res.end();
});

router.get('/', async function (req, res) {
    const date = new Date(req.query.date);
    const classes = await classesService.getClassesByDate(date);
    res.json(classes);
});


module.exports = router;
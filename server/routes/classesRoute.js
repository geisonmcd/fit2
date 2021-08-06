const express = require('express');
const router = express.Router({ mergeParams: true });
const timetablesService = require('../services/timetablesService');
const classesService = require('../services/classesService');

router.post('/generateClasses', async function (req, res) {
    const { idTimetable, startDate, endDate, vacancies } = req.body;
    await classesService.generateClasses(idTimetable, startDate, endDate, vacancies);
    res.end();
});

router.post('/:idClass/confirmAttendance', async function (req, res) {
    const idClass = req.params.idClass;
    const { idUser } = req.body;
    let users = await classesService.confirmAttendance(idClass, idUser);
    res.json(users);
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
    console.log('é serio mesmo')
    const classes = await classesService.getClassesByDate(date);
    console.log(classes)
    res.json(classes);
});

router.get('/:idClass/users', async function (req, res) {
    let idClass = req.params.idClass;
    const classes = await classesService.getUsersByIdClass(idClass);
    res.json(classes);
});



module.exports = router;
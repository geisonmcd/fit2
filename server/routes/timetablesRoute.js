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

// router.delete("/:idInstitution", async function (req, res) {
//     const idInstitution = req.params.idInstitution;
//     await institutionsService.deleteInstitution(idInstitution);
//     res.end();
// });

// router.put('/:idInstitution', async function (req, res) {
//     const idInstitution = req.params.idInstitution;
//     const institution = req.body;
//     await institutionsService.updateInstitution(idInstitution, institution);
//     res.end();
// });

module.exports = router;
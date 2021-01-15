const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewsService = require('services/reviewsService');

router.get('/', async function (req, res) {
    const idInstitution = req.params.idInstitution;
    const idUser = req.params.idUser;
    const review = await reviewsService.getReviewByIdInstitutionAndIdUser(idInstitution, idUser);
    res.json(review);
});

router.post('/', async function (req, res) {
    const idUser = req.params.idUser;
    const idInstitution = req.params.idInstitution;
    const review = req.body;
    await reviewsService.saveReview(idInstitution, idUser, review);
    res.end();
});

router.put('/:idReview', async function (req, res) {
    const idReview = req.params.idReview;
    const review = req.body;
    await reviewsService.updateReview(idReview, review);
    res.end();
});

module.exports = router;
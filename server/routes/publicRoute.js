const express = require('express');
const router = express.Router({ mergeParams: true });
const authService = require('../services/authService');

router.post('/auth/login', function (req, res) {
    var auth = req.body;
    authService.login(auth.username, auth.password).then(function (user) {
        res.json(user);
    }, function () {
        res.status(401).end();
    });
});

router.get('/auth/session', async function (req, res) {
    let session = await authService.getSession(req.query.username);
    res.json(session);
});

module.exports = router;
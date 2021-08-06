const express = require('express');
const router = express.Router({ mergeParams: true });
const usersService = require('../services/usersService');

router.post('/', async function (req, res) {
    console.log('chegou na rotda')
    const user = req.body;
    let newUser = await usersService.addUser(user);
    res.json(newUser);
});

module.exports = router;
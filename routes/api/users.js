const express = require('express');
const router = express.Router();

const usersC = require('../../controllers/usersController');

// users Route
router
    .get('/', usersC.login_user)
    .get('/all', usersC.displayAll)
    .post('/', usersC.create_user)
    .put('/', usersC.update_password);

module.exports = router;
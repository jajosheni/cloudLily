const express = require('express');
const router = express.Router();

const advertsC = require('../../controllers/advertsController');

// adverts Route
router
    .get('/', advertsC.list_advert)
    .post('/', advertsC.create_advert)
    .get('/:id', advertsC.get_advert);

module.exports = router;
const express = require('express');
const controllers = require('../controllers/cryptocurrency.controller');

const router = express.Router();

router.get('/listings/latest', controllers.listingsLatest);

module.exports = router;
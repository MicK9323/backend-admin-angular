const express = require('express');
const searchController = require('../controllers/search.controller');
const auth = require('../middlewares/authentication');

let router = express.Router();

router.get('/search/all', auth.verifyToken, searchController.searchAllCollections);
router.get('/search/:collection', auth.verifyToken, searchController.searchByCollection);

module.exports = router;

const express = require('express');
const router = express.Router();
const commitmentsCtrl = require('../../controllers/api/commitments');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All paths start with '/api/commitments'
router.get('/', commitmentsCtrl.index)

module.exports = router;
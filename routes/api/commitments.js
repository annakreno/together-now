const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const commitmentsCtrl = require('../../controllers/api/commitments')

// All paths start with '/api/commitments'
router.get('/', commitmentsCtrl.index)
router.post('/', commitmentsCtrl.create)

module.exports = router;
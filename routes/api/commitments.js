const express = require('express');
const router = express.Router();
const commitmentsCtrl = require('../../controllers/api/commitments')

// All paths start with '/api/commitments'
router.get('/', commitmentsCtrl.index)
router.post('/new', commitmentsCtrl.create)
router.put('/:id/edit', commitmentsCtrl.update)
router.delete('/:id/delete', commitmentsCtrl.delete)

module.exports = router;
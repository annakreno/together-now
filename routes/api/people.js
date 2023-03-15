const express = require('express');
const router = express.Router();
const peopleCtrl = require('../../controllers/api/people')

// All paths start with '/api/commitments'
router.post('/new', peopleCtrl.create)
router.put('/:id/edit', peopleCtrl.update)
router.delete('/:id/delete', peopleCtrl.delete)

module.exports = router;
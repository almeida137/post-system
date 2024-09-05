const express = require('express');
const { createBorder, getAllBorder, deleteBorderById, getBorderById, updateBorder } = require('../App/Http/Controllers/BorderController');
const router = express.Router();


router.post('/', createBorder)

router.get('/', getAllBorder)

router.get('/:id', getBorderById)

router.delete('/:id', deleteBorderById)

router.put('/:id', updateBorder)


module.exports = router; 
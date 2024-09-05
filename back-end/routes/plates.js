const express = require('express');
const { createPlate, getAllPlates, deletePlateById, getPlateById, updatePlate } = require('../App/Http/Controllers/PlateController');
const router = express.Router();


router.post('/', createPlate)

router.get('/', getAllPlates)

router.get('/:id', getPlateById)

router.delete('/:id', deletePlateById)

router.put('/:id', updatePlate)


module.exports = router; 
const express = require('express');
const router = express.Router();
const colorCollectionController = require('../App/Http/Controllers/ColorController');

// Rotas existentes
router.post('/color', colorCollectionController.createColorCollection);
router.get('/color', colorCollectionController.getAllColorCollections);
router.get('/color/:id', colorCollectionController.getColorCollectionById);
router.put('/color/:id', colorCollectionController.updateColorCollection);
router.delete('/color/:id', colorCollectionController.deleteColorCollection);

// Nova rota para deletar uma cor de uma coleção
router.delete('/color/:brandName/colors/:colorCode', colorCollectionController.deleteColorFromCollection);

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../App/models/ProductModel');

// Rota para obter todos os produtos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});
module.exports = router;
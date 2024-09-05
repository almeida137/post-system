const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderByID, updateOrder, deleteOrderByID } = require('../App/Http/Controllers/OrderController');
const multer = require('multer');
const path = require('path');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
// Rota POST para criar uma solicitação
router.post('/', upload.array('anexos', 10), createOrder)

// Rota GET para buscar todas as solicitações
router.get('/', getAllOrders)

// Rota para buscar uma solicitação específica pelo ID
router.get('/:id', getOrderByID)

// Rota PUT para atualizar uma solicitação específica
router.put('/:id', updateOrder)

// Rota para apagar uma solicitação pelo ID
router.delete('/:id', deleteOrderByID)

module.exports = router; 
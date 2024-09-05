const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserByID } = require('../App/Http/Controllers/UserController');
const authMiddleware = require('../App/Http/Middlewares/Auth');

// Rota POST para criar usuário
router.post('/', createUser);

// Rota GET para buscar todos os usuários
router.get('/', getUsers)
 
// Rota GET para buscar usuário pelo id - privada
router.get('/:id', authMiddleware, getUserByID)

module.exports = router;

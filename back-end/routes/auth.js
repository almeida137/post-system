const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../App/models/UserModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(senha, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Configuração do JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Chave secreta não configurada');
    }

    // Criação do token com userType incluído
    const token = jwt.sign(
      { id: user._id, userType: user.type }, // Inclui userType no payload do token
      secret,
      { expiresIn: '1h' } // Definindo tempo de expiração do token
    );

    res.status(200).json({
      msg: 'Usuário Autenticado!',
      token,
      userType: user.type // Inclui userType na resposta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao autenticar o usuário' });
  }
});

module.exports = router;

const User = require('../../models/UserModel'); // Importe o modelo de usuário
const bcrypt = require('bcryptjs');


const createUser = async (req, res) => {
  const { name, email, password, type, active } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Email já cadastrado!' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashedPassword,
      type,
      active
    });

    await user.save();

    res.json({ msg: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err.message);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-password'); 
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

module.exports = { createUser, getUsers, getUserByID };

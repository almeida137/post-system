require("dotenv").config()
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const url = process.env.DB_URL;
    const dbName = process.env.DB;

    // Conectar ao MongoDB usando Mongoose
    await mongoose.connect(url, {dbName});

    console.log('Conectado ao banco de dados MongoDB com Mongoose');

    // Retornar o objeto de conexão do Mongoose
    return mongoose.connection;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    throw err;
  }
};

module.exports = connectToDB;

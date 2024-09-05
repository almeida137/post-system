var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectToDB = require('./server/db/connect');
var authRoutes = require('./routes/auth');
var usersRouter = require('./routes/users');
var orderRoutes = require('./routes/order')
var plateRoutes = require('./routes/plates')
var borderRoutes = require('./routes/border')
const colorRoutes = require('./routes/color')
const cors = require('cors');
require("dotenv").config()


var app = express();


app.use(cors());

const startServer = async () => {
  try {
    // Conectar ao banco de dados
    const { client, db } = await connectToDB();

    // Configuração do Express
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/uploads', (req, res, next) => {
      res.setHeader('Content-Disposition', 'attachment');
      next();
    });

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


    // Rotas
    app.use('/api', colorRoutes);
    app.use('/api/users', usersRouter);
    app.use('/api/auth', authRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/plates', plateRoutes);
    app.use('/api/border', borderRoutes);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    // Iniciar o servidor
    const port = process.env.SERVER_PORT
    app.listen(port, () => {
      console.log(`Servidor Express iniciado na porta ${port}`);
    });

  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1); 
  }
};

// Iniciar a função assíncrona para conectar ao banco de dados e iniciar o servidor
startServer();

module.exports = app;

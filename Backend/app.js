'use strict'

// Cargar módulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas
var article_routes = require('./routes/article');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

// Exportar módulo 
module.exports = app;
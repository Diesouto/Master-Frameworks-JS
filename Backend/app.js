'use strict'

// Cargar módulos de node para crear servidor
const express = require('express');
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');

// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas

// Ruta o método de prueba
app.get('/', (req, res) => {
    
    return res.status(200).send({
        curso: "Master en Frameworks JS",
        autor: "Diego Souto",
        url: "github/Diesouto"
    });
});

// Exportar módulo 
module.exports = app;
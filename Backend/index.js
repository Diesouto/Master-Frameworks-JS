'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;

mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false); DEPRECATED
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log('Conectado!');

        // Crear servidor y escuchar peticiones HTTP
        app.listen(port, () => {
            console.log("Servidor corriendo en http://localhost:" + port);
        });
    });
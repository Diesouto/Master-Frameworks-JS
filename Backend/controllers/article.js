'use strict'

var controller = {
    datosCurso: (req, res) => {
        return res.status(200).send({
            curso: "Master en Frameworks JS",
            autor: "Diego Souto",
            url: "github/Diesouto"
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test del controlador de artículos'
        });
    }
    
};

module.exports = controller;
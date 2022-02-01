'use strict'

const validator = require('validator');
const Article = require('../models/article');

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
    },

    save: (req, res) => {
        // Recoger parámetros
        const params = req.body;

        //#region Validar
        try {
            const validate_title = !validator.isEmpty(params.title);
            const validate_content = !validator.isEmpty(params.content);
            
            if(!validate_title && !validate_content) {
                return res.status(400).send({
                    article: 'Los datos no son válidos'
                });
            }
        } catch (error) {
            return res.status(400).send({
                article: 'Faltan datos por enviar'
            });
        }
        //#endregion

        //#region Crear objeto
        var article = new Article();
        article.title = params.title;
        article.content = params.content;
        //#endregion

        //#region Guardar artículo
        article.save((err, articleStored) => {
            // Error
            if(err || !articleStored) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'El artículo no se ha guardado'
                });
            }

            // Guardado correcto
            return res.status(200).send({
                article: 'Guardado',
                article
            });
        })
        //#endregion
    }
    
};

module.exports = controller;
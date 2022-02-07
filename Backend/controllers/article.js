'use strict'

const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Article = require('../models/article');

const controller = {
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
    },
    
    getArticles: (req, res) => {
        const query = Article.find({});

        // Limit results
        const last = req.params.last;
        if(last != undefined) {
            query.limit(3);
        }

        // Find
        query.sort('-_id').exec((err, articles) => {
            //#region Validar
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Los datos no son válidos"
                });
            }

            if(!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay artículos"
                });
            }
            //#endregion

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    getArticle: (req, res) => {
        // Recoger id de la url
        const id = req.params.id;

        //#region Validar id
        try {
            if(validator.isEmpty(id)) {
                return res.status(400).send({
                    article: 'El id no es válido'
                });
            }
        } catch (error) {
            return res.status(400).send({
                article: 'Faltan datos por enviar'
            });
        }
        //#endregion

        // Buscar el artículo
        Article.findById(id, (err, article) => {
            //Validar article
            if(err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: "No se ha encontrado el artículo"
                });
            }

            // Devolver artículo
            res.status(200).send({
                article
            });
        });
    },

    update: (req, res) => {
        // Recoger el id del artículo
        const articleId = req.params.id;

        // Recoger los datos
        const params = req.body;

        //#region Validar los datos
        try {
            const validate_title = validator.isEmpty(params.title);
            const validate_content = validator.isEmpty(params.content);

            if(validate_title && validate_content) {
                return res.status(500).send({
                    status: 'error',
                    message: "Faltan campos por enviar"
                });
            };
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        //#endregion

        // Find and update
        Article.findOneAndUpdate({_id: articleId}, params, { new: true }, (err, articleUpdated) => {
            //#region Validar
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al actualizar"
                });
            }

            if(!articleUpdated) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el artículo a actualizar"
                });
            }
            //#endregion
        
            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                articleUpdated
            });
        });
    },
    
    delete: (req, res) => {
        // Recoger el id del artículo
        const articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, removedArticle) => {
            //#region Validar
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se ha podido borrar el artículo"
                });
            }

            if(!removedArticle) {
                return res.status(400).send({
                    status: 'error',
                    message: "No existe el artículo a borrar"
                });
            }
            //#endregion

            // Devolver respuesta
            return res.status(200).send({
                status: 'success',
                message: "Artículo borrado",
                removedArticle
            });
        });
    },

    upload: (req, res) => {
        // Configurar connect multiparty en: router/article.js
        //#region Params
        const idArticulo = req.params.id;

        // Recoger fichero
        if(!req.files.file0 || !idArticulo) {
            return res.status(404).send({
                status: 'error',
                message: 'Imagen no subida...'
            });
        }

        // Conseguir nombre y extensión
        const file_name = req.files.file0.name;
        const file_ext = file_name.split('.')[1];
        const file_path = req.files.file0.path;
        const file_split = file_path.split('\\');   // Windows
        // const file_split = file_path.split('/'); // Linux o Mac
        //#endregion

        //#region Validar
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //Borrar archivo y delvolver respuesta
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'Extensión del archivo no es válida'
                });
            });
        } 
        //#endregion
        //#region Buscar artículo y guardar imagen
        else {
            Article.findOneAndUpdate({ _id: idArticulo }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                // Validar
                if(err || !articleUpdated) {
                    fs.unlink(file_path, (err) => {
                        return res.status(404).send({
                            status: 'error',
                            message: 'Error al guardar el archivo'
                        });
                    });
                }
                // Devolver respuesta
                else {
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                }
            });
        }
        //#endregion
    },

    getImage: (req, res) => {
        // Params
        const file = req.params.image;
        const path_file = './upload/articles/' + file;

        // Validar
        fs.exists(path_file, (exists) => {
            if(!exists) {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });

        // Respuesta
        return res.sendFile(path.resolve(path_file));
    },

    search: (req, res) => {
        // Parámetro a buscar
        const search = req.params.search;

        // Búsqueda
        Article.find({
            "$or": [
                {"title": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}},
            ]
        })
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            // Validar
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            };

            if(articles.length === 0) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay artículos que coincidan con tu búsqueda"
                });
            };

            // Respuesta
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    }
};

module.exports = controller;
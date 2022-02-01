'use strict'

const express = require('express');
const ArticleController = require('../controllers/article');

const router = express.Router();

router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);
router.get('/save', ArticleController.save);

module.exports = router;
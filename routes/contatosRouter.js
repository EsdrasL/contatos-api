const express = require('express');
const bodyParser = require('body-parser');

const dbConnection = require('../dbConnection');
const modelContatos = require('../models/contatos');

const contatoRouter = express.Router();
contatoRouter.use(bodyParser.json());

const connection = dbConnection();
const Contatos = new modelContatos(connection);

contatoRouter.route('/')
  .get(function(req, res, next) {

    function fncallback(err, result) {
      if(err) throw err;
      res.json(result);
    }

    if(Object.keys(req.query).length === 0 && req.query.constructor === Object)
      Contatos.findAll(fncallback);
    if(req.query.nome)
      Contatos.findByNome(req.query.nome, fncallback);
    if(req.query.apelido)
      Contatos.findByApelido(req.query.apelido, fncallback);
    if(req.query.de && req.query.ate)
      Contatos.findByDate(req.query.de, req.query.ate, fncallback);
  })

  .post(function(req, res, next) {
    Contatos.create(req.body, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

contatoRouter.route('/:id')
  .get(function(req, res, next) {
    Contatos.findOne(req.params.id, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  })

  .put(function(req, res, next) {
    Contatos.update(req.params.id, req.body, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  })

  .delete(function(req, res, next) {
    Contatos.remove(req.params.id, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

module.exports = contatoRouter;

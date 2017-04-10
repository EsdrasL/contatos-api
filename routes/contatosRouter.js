const express = require('express');
const bodyParser = require('body-parser');

const dbConnection = require('../dbConnection');
const modelContatos = require('../models/contatos');

const AWS = require('aws-sdk');
AWS.config.loadFromPath('./dynamoCredential.json');

const log = require('../log');

const contatoRouter = express.Router();
contatoRouter.use(bodyParser.json());

const connection = dbConnection();
const Contatos = new modelContatos(connection);

contatoRouter.route('/')
  .get(function(req, res, next) {

    const start = Date.now();

    function fncallback(err, result) {
      if(err) throw err;
      res.json(result);
    }

    if(Object.keys(req.query).length === 0 && req.query.constructor === Object) {
      Contatos.findAll(fncallback);
      log('LIST', (Date.now() - start).toString(), Date.now(), AWS);
    } else if(req.query.nome) {
      Contatos.findByNome(req.query.nome, fncallback);
      log('BUS', (Date.now() - start).toString(), Date.now(), AWS);
    } else if(req.query.apelido) {
      Contatos.findByApelido(req.query.apelido, fncallback);
      log('BUS', (Date.now() - start).toString(), Date.now(), AWS);
    } else if(req.query.de && req.query.ate) {
      Contatos.findByDate(req.query.de, req.query.ate, fncallback);
      log('FILT', (Date.now() - start).toString(), Date.now(), AWS);
    }
  })

  .post(function(req, res, next) {
    const start = Date.now();
    Contatos.create(req.body, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
    log('CAD', (Date.now() - start).toString(), Date.now(), AWS);
  });

contatoRouter.route('/:id')
  .get(function(req, res, next) {
    const start = Date.now();
    Contatos.findOne(req.params.id, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
    log('SHOW', (Date.now() - start).toString(), Date.now(), AWS);
  })

  .put(function(req, res, next) {
    const start = Date.now();
    Contatos.update(req.params.id, req.body, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
    log('ALT', (Date.now() - start).toString(), Date.now(), AWS);
  })

  .delete(function(req, res, next) {
    const start = Date.now();
    Contatos.remove(req.params.id, function(err, result) {
      if(err) throw err;
      res.json(result);
    });
    log('EXC', (Date.now() - start).toString(), Date.now(), AWS);
  });

module.exports = contatoRouter;

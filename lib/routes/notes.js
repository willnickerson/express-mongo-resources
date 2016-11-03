const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Note = require('../model/note');
const err = {};

router
  .get('/todo', (request, response, next) => {
    Note.find({'done':false})
    .then(notes => response.send(`${notes.length} unfinished task(s)`))
    .catch(next);
  })
  .get('/', (request, response, next) => {
    Note.find()
      .then(notes => response.send(notes))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })
  .get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => response.send(note))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })
  .post('/', bodyParser, (request, response, next) => {
    new Note(request.body).save()
      .then(saved => response.send(saved))
      .catch(() => {
        err.code = 400;
        err.message = 'ERROR INVALID JSON';
        next(err);
      });
  })
  .put('/:id', bodyParser, (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id, request.body, {new : true})
      .then(updated => response.send(updated))
      .catch(() => {
        err.code = 400;
        err.message = 'ERROR INVALID JSON';
        next(err);
      });
  })
  .delete('/:id', (request, response, next) => {
    Note.remove({_id : request.params.id})
      .then(() => response.send('You have deleted a note!'))
      .catch(() => {
        err.code = 404;
        err.message = 'Could not find resource to delete';
        next(err);
      });
  })
  .delete('/', (request, response, next) => {
    Note.remove()
      .then(() => response.send('You have deleted everything!'))
      .catch(() => {
        err.code = 404;
        err.message = 'Bad Request';
        next(err);
      });
  });


module.exports = router;

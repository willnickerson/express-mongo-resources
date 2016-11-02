const express = require('express');
const router = express.Router();
const bodyParser = require('../body-parser')();
const Note = require('../model/note');
const err = {};

router
  .get('/todo', (request, response, next) => {
    let total = 0;
    Note.find()
    .then(notes => {
      notes.forEach(note => {
        if(note.done === false) total += 1;
      });
      return total;
    })
    .then(() => response.send(`You have ${total} things left todo`))
    .catch(next);
  })
  .get('/', (request, response, next) => {
    let body = '';
    Note.find()
      .then(notes => {
        notes.forEach(note => {
          body += `${note.title} - ${note.body}, finished: ${note.done} \n`;
        });
        return body;
      })
      .then(body => response.send(body))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })
  .get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => response.send(`${note.title} - ${note.body}, finished: ${note.done}`))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })
  .post('/', bodyParser, (request, response, next) => {
    new Note(request.body).save()
      .then(saved => response.send(`You have saved a note: ${saved.title} - ${saved.body}, finished: ${saved.done}`))
      .catch(next);
  })
  .put('/:id', bodyParser, (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id, request.body, {new : true})
      .then(updated => response.send(`You have updated a note: ${updated.title} - ${updated.body}, finished: ${updated.done}`))
      .catch(next);
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

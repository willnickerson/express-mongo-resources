const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Reminder = require('../model/reminder');
const err = {};

router
  .get('/', (request, response, next) => {
    let body = '';
    Reminder.find()
      .then(reminders => {
        reminders.forEach(reminder => {
          body += `${reminder.title} - ${reminder.location} on ${reminder.date} \n`;
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
    Reminder.findById(request.params.id)
      .then(reminder => response.send(`${reminder.title} - ${reminder.location}`))
      .catch(() => {
        err.code = 404;
        err.message = 'Resource not found';
        next(err);
      });
  })
  .post('/', bodyParser, (request, response, next) => {
    new Reminder(request.body).save()
      .then(saved => response.send(`You have saved a reminder: ${saved.title} - ${saved.location} on ${saved.date}`))
      .catch(next);
  })
  .put('/:id', bodyParser, (request, response, next) => {
    Reminder.findByIdAndUpdate(request.params.id, request.body, {new : true})
      .then(updated => response.send(`You have updated a reminder: ${updated.title} - ${updated.location} on ${updated.date}`))
      .catch(next);
  })
  .delete('/:id', (request, response, next) => {
    Reminder.remove({_id : request.params.id})
      .then(() => response.send('You have deleted a reminder!'))
      .catch(() => {
        err.code = 404;
        err.message = 'Could not find resource to delete';
        next(err);
      });
  })
  .delete('/', (request, response, next) => {
    Reminder.remove()
      .then(() => response.send('You have deleted everything!'))
      .catch(() => {
        err.code = 404;
        err.message = 'Bad Request';
        next(err);
      });
  });


module.exports = router;

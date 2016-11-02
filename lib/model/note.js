const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    default: ''
  },

  done: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Note', schema);

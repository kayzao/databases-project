const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Example', exampleSchema);

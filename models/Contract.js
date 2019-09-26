const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  initialDate: {
    type: String,
    require: true,
  },
  dueDate: {
    type: String,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model('Contract', ContractSchema);

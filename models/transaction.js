let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BlockChain = new Schema({
  index: {
    required: true,
    type: Schema.Types.Number,
  },
  timestamp: {
    required: true,
    type: Schema.Types.Date,
    default: Date.now(),
  },
  transactions: {
    required: true,
    type: Schema.Types.Array,
  },
  prevHash: {
    required: false,
    type: Schema.Types.String,
  },
  hash: {
    required: false,
    type: Schema.Types.String,
  },
});

module.exports = mongoose.model('BlockChain', BlockChain);

const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  jsonContent: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;

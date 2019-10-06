const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FaqsSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = Faqs = mongoose.model("faqs", FaqsSchema);

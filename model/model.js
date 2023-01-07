const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  companyName: {
    required: true,
    type: String,
  },
  shortDescription: {
    required: true,
    type: String,
  },
  companyWebsite: {
    required: true,
    type: String,
  },
  Tags: {
    required: true,
    type: String,
  },
  teamSize: {
    required: true,
    type: String,
  },
  companyLinkedIn: {
    required: true,
    type: String,
  },
  contactName: {
    required: true,
    type: String,
  },
  availableJobs: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);

const mongoose = require("mongoose");

const formModel = mongoose.Schema(
  {
    frequency: { type: String, required: true },

    mode: { type: String, required: true },

    area: { type: String, required: true },

    arrtime: { type: String, required: true },

    deptime: { type: String, required: true },

    service: { type: String, required: true },

    userEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

const RequestModel = mongoose.model("Request", formModel);

module.exports = RequestModel;

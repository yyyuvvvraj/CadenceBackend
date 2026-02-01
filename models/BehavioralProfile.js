const mongoose = require("mongoose");

const BehavioralProfileSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  keystrokeProfile: {
    avgHoldTime: Number,
    avgFlightTime: Number,
    typingSpeed: Number,
    errorRate: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BehavioralProfile", BehavioralProfileSchema);

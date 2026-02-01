const BehavioralProfile = require("../models/BehavioralProfile");

exports.enrollUser = async (req, res) => {
  try {
    const {
      userId,
      avgHoldTime,
      avgFlightTime,
      typingSpeed,
      errorRate,
    } = req.body;

    const profile = await BehavioralProfile.findOneAndUpdate(
      { userId },
      {
        userId,
        keystrokeProfile: {
          avgHoldTime,
          avgFlightTime,
          typingSpeed,
          errorRate,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json({
      message: "User behavioral profile enrolled",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

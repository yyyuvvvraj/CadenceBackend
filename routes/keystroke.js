const express = require("express");
const router = express.Router();
const Profile = require("../models/BehavioralProfile");

/* =========================
   ENROLL (baseline)
========================= */
router.post("/enroll", async (req, res) => {
  try {
    const {
      userId,
      avgHoldTime,
      avgFlightTime,
      typingSpeed,
      errorRate,
    } = req.body;

    const profile = await Profile.findOneAndUpdate(
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
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "Enrollment successful",
      profile,
    });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed" });
  }
});

/* =========================
   VERIFY (range-based)
========================= */
router.post("/verify", async (req, res) => {
  try {
    const {
      userId,
      avgHoldTime,
      avgFlightTime,
      typingSpeed,
      errorRate,
    } = req.body;

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "User not enrolled" });
    }

    const stored = profile.keystrokeProfile;

    const diffScore =
      Math.abs(stored.avgHoldTime - avgHoldTime) +
      Math.abs(stored.avgFlightTime - avgFlightTime) +
      Math.abs(stored.typingSpeed - typingSpeed) * 10 +
      Math.abs(stored.errorRate - errorRate) * 100;

    const THRESHOLD = 25; // RANGE-based authentication

    res.json({
      verified: diffScore < THRESHOLD,
      score: diffScore,
      threshold: THRESHOLD,
    });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;

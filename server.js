const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const enrollRoutes = require("./routes/enroll");
const keystrokeRoutes = require("./routes/keystroke");

connectDB();

const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Passport config
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Cadence backend is running 🚀",
  });
});

app.use("/api", enrollRoutes);
app.use("/api", keystrokeRoutes);
app.use("/auth", authRoutes);

// Start server LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

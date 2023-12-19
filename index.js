const express = require("express");
const path = require("path");
const app = express();

// Set up the EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = now.getHours();

  // Check if it's a weekday (Monday to Friday) and the time is between 9 and 17
  if (day >= 1 && day <= 5 && hours >= 9 && hours < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send(
      "Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
    );
  }
};

// Middleware to serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Use the custom middleware for all routes
app.use(checkWorkingHours);

// Define routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

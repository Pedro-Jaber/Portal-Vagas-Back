const express = require("express");

const app = express();
const PORT = 8081;

// middleware

// Dotenv

// Routes
app.get("/", (req, res) => {
  res.status(200).render("paginaEmConstrucao");
});

// Error 404 Page
app.get("*", (req, res) => {
  res.status(404).send("404");
});

// App Listen
app.listen(PORT, () => {
  console.log("=~=~=~=~=~=~=~=~=~=~=~=~=~=");
  console.log("Server:\x1b[92m Online \x1b[0m");
  console.log("Port: " + PORT);
  console.log(`link: http://localhost:${PORT}`);
});

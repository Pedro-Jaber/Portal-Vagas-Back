const express = require("express");

const app = express();
const PORT = 8081;

// middleware

// Dotenv

// Routes
app.get("/", (req, res) => {
  res.send("Página em construção");
});

// App Listen
app.listen(PORT, () => {
  console.log("=~=~=~=~=~=~=~=~=~=~=~=~=~=");
  console.log("Server:\x1b[92m Online \x1b[0m");
  console.log("Port: " + PORT);
  console.log(`link: http://localhost:${PORT}`);
});

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const candidatoRouter = require("./routers/candidato");
const representanteRouter = require("./routers/representante");

//* App
const app = express();
const PORT = 8081;

//* Middleware
app.use(express.static("public"));

//* View Engine
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

//* Dotenv

//* Routes
app.get(["/", "/home"], (req, res) => res.status(200).send("Home"));
// app.get("/", (req, res) => res.status(200).render("home", { title: "Home" }));
app.use("/candidato", candidatoRouter);
app.use("/representante", representanteRouter);

//* Error 404 Page
app.get("*", (req, res) => res.status(404).send("404"));
// app.get("*", (req, res) =>
//   res.status(404).render("404_error", { title: "Página não encontrada 404" }),
// );

//* App Listen
app.listen(PORT, () => {
  console.log("=~=~=~=~=~=~=~=~=~=~=~=~=~=");
  console.log("Server:\x1b[92m Online \x1b[0m");
  console.log("Port: " + PORT);
  console.log(`link: http://localhost:${PORT}`);
});

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { sequelize } = require("./model/dataBase");

const candidatoRouter = require("./routers/candidato");
const representanteRouter = require("./routers/representante");
const bataBaseRouter = require("./routers/bataBase");

//* App
const app = express();
const PORT = 8081; //TODO Criar variavel de ambiente

//* Middleware
app.use(express.static("public"));
// app.use(express.urlencoded);
// app.use(express.json());

//* View Engine
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

//* Dotenv

//* Routes
app.get(["/", "/home"], (req, res) => res.status(200).send("Home"));
// app.get("/", (req, res) => res.status(200).render("home", { title: "Home" }));
app.use("/db", bataBaseRouter);
app.use("/candidato", candidatoRouter);
app.use("/representante", representanteRouter);

//* Error 404 Page
app.get("*", (req, res) => res.status(404).send("404"));
// app.get("*", (req, res) =>
//   res.status(404).render("404_error", { title: "Página não encontrada 404" }),
// );

//* App Listen
async function start() {
  try {
    await sequelize.authenticate();
    console.log("=~=~=~=~=~=~=~=~=~=~=~=~=~=");
    console.log("DataBase:\x1b[92m Online \x1b[0m");

    app.listen(PORT, () => {
      console.log("Server:\x1b[92m Online \x1b[0m");
      console.log("Port: " + PORT);
      console.log(`link: http://localhost:${PORT}`);
      console.log("->");
    });
  } catch (error) {
    console.log("Não foi possivel se conectar ao banco de dados");
    console.error(error);
  }
}
start();

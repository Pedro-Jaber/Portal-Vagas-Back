// Dependencies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const { sequelize } = require("./model/dataBase");

// Routers
const candidatoRouter = require("./routers/candidato");
const representanteRouter = require("./routers/representante");
const dataBaseRouter = require("./routers/bataBase");
const authRouter = require("./routers/auth");

// Middlewares
const { checkUser } = require("./middleware/auth");

//*Dotenv
dotenv.config();

//* App
const app = express();
const PORT = 8081; //TODO Criar variavel de ambiente

//* Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//* View Engine
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

//* Dotenv

//* Routes
app.get("*", checkUser);
app.get(["/", "/home"], (req, res) => res.status(200).send("Home"));
// app.get("/", (req, res) => res.status(200).render("home", { title: "Home" }));
app.use("/db", dataBaseRouter);
app.use("/auth", authRouter); //TODO fazer rotas diferentes para candidato e representante
app.use("/candidato", candidatoRouter);
app.use("/representante", representanteRouter);

//TODO Errors router
//* Error 404 Page
app.use("/401", (req, res) => res.status(401).send("401 Unauthorized"));
app.get("/404", (req, res) => res.status(404).send("404 Not Found"));
app.get("*", (req, res) => res.status(404).redirect("/404"));
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
    console.log("\x1b[31m┌────────────────────────────────────────────────┐");
    console.log("│ Não foi possivel se conectar ao banco de dados │");
    console.log("└────────────────────────────────────────────────┘\x1b[0m");

    // console.error(error);
  }
}
start();

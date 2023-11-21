const { Candidato, criarCandidato } = require("../model/candidato");
const {
  Representante,
  criarRepresentante,
  gerarSenhaTemporaria,
} = require("../model/representante");
const { Vaga, criarVaga } = require("../model/vaga");
const { VagaCandidato, StatusCandidatura } = require("../model/vagaCandidato");

module.exports.createCand = async (req, res) => {
  // criarCandidatos();
  // criarVagas();
  // criarRelacaoVagaCandidato();
  //criarRepresentantes();

  // const candidato = await criarCandidato(
  //   "nomeTest",
  //   "email@test.com",
  //   "senhaTest",
  // );
  // res.send(candidato);

  res.send("va para http://localhost:8081/db/selectCand para ver o resultado");
};

module.exports.selectCand = async (req, res) => {
  const candidatos = await Candidato.findAll();
  const vagas = await Vaga.findAll();
  const vagasCandidatos = await VagaCandidato.findAll();
  const representante = await Representante.findAll();

  res.send([
    "candidatos",
    candidatos,
    "vagas",
    vagas,
    "vagasCandidatos",
    vagasCandidatos,
    "representante",
    representante,
  ]);
};

module.exports.test = async (req, res) => {
  const password = gerarSenhaTemporaria();
  console.log(password);
  res.send(password);
};

module.exports.testRepresentanteGet = async (req, res) => {
  try {
    const representantes = await Representante.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).render("formsESelect", {
      title: "representantes",
      data: representantes,
      tag: "representante",
    });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.testVagaGet = async (req, res) => {
  try {
    const vagas = await Vaga.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).render("formsESelect", {
      title: "vagas",
      data: vagas,
      tag: "vaga",
    });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.testCandidatoGet = async (req, res) => {
  try {
    const candidatos = await Candidato.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).render("formsESelect", {
      title: "candidato",
      data: candidatos,
      tag: "candidato",
    });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

function geraListaDeHabilidades(reqBody) {
  let listaDeHabilidades = [];
  let i = 1;

  while (reqBody[`habilidade${i}`] != undefined) {
    const habilidadeKey = `habilidade${i}`;
    const nivelKey = `nivelHabilidade${i}`;

    if (habilidadeKey in reqBody && nivelKey in reqBody) {
      if (reqBody[habilidadeKey] !== "" && reqBody[nivelKey] !== "") {
        const habilidade = reqBody[habilidadeKey];
        const nivel = reqBody[nivelKey];
        listaDeHabilidades.push([habilidade, nivel]);
      }
    }
    i++;
  }

  console.log(listaDeHabilidades);
  return listaDeHabilidades;
}

module.exports.testFormPost = async (req, res) => {
  const { tag } = req.body;
  console.log(req.body);
  try {
    if (tag == "representante") {
      let { nome, email, senha, cpf } = req.body;
      senha = senha || gerarSenhaTemporaria(); //TODO tirar o gerador de senha

      //TODO passar o tratamento de erro para dentro da função
      if (nome == "") {
        throw "O nome não poder ser null";
      }
      if (email == "") {
        throw "O email não poder ser null";
      }
      if (cpf == "") {
        throw "O CPF não poder ser null";
      }
      criarRepresentante(nome, email, senha, cpf);
    }

    if (tag == "vaga") {
      let { empresa, cargaHoraria, bolsa, descricao } = req.body;
      //TODO passar o tratamento de erro para dentro da função
      if (empresa == "") {
        throw "A empresa não poder ser null";
      }
      if (cargaHoraria == "") {
        throw "A carga horaria não poder ser null";
      }
      if (bolsa == "") {
        throw "A bolsa não poder ser null";
      }
      if (descricao == "") {
        throw "A dercrição não poder ser null";
      }

      criarVaga(empresa, cargaHoraria, bolsa, descricao);
    }

    if (tag == "candidato") {
      let { nome, email, senha, nascimento, cpf, telefone } = req.body;
      senha = senha || gerarSenhaTemporaria(); //TODO tirar o gerador de senha

      //TODO passar o tratamento de erro para dentro da função
      if (!nome) {
        throw "O nome não pode ser null";
      }
      if (!email) {
        throw "O email não pode ser null";
      }
      if (!telefone) {
        throw "O telefone não pode ser null";
      }
      // if (!senha) {
      //   throw "A senha não pode ser null";
      // }

      const habilidades = geraListaDeHabilidades(req.body);

      criarCandidato(
        nome,
        email,
        senha,
        telefone,
        habilidades,
        nascimento,
        cpf,
      );
    }

    res.status(200).redirect(`/db/${tag}`);
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.statusInint = async (req, res) => {
  // const status = await StatusCandidatura.bulkCreate([
  //   { status: "Cadastrado", cor: "#ffc107" },
  //   { status: "Selecionado", cor: "#198754" },
  //   { status: "Eliminado", cor: "#dc3545" },
  //   { status: "Desistiu", cor: "#6f29b1" },
  // ]);

  res.status(200).json({ mensagem: "ok" });
};

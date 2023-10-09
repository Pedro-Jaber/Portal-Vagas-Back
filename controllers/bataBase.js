const { Candidato, criarCandidato } = require("../model/candidato");
const {
  Representante,
  criarRepresentante,
  gerarSenhaTemporaria,
} = require("../model/representante");
const { Vaga } = require("../model/vaga");
const {
  VagaCandidato,
  candidatoParticiparDeVaga,
} = require("../model/vagaCandidato");

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

module.exports.testFormGet = async (req, res) => {
  try {
    const representante = await Representante.findAll({
      order: [["createdAt", "DESC"]],
    });

    res
      .status(200)
      .render("representante", { title: "testForm", data: representante });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};
module.exports.testFormPost = async (req, res) => {
  const { nome, email, cpf } = req.body;
  criarRepresentante(nome, email, cpf)
    .then(() => {
      res.status(200).redirect("/db/testForm");
    })
    .catch((error) => {
      res.status(500).send("500 Internal Server Error: " + error);
    });
};

async function criarCandidatos() {
  try {
    // await Candidato.sync({ force: true }); // Isso irá criar a tabela 'candidato'

    // Array de dados de candidatos
    const candidatosData = [
      {
        nome: "João Silva",
        email: "joao@email.com",
        senha: "senha123",
        nascimento: "1998-03-15",
        cpf: "123.456.789-00",
      },
      {
        nome: "Maria Santos",
        email: "maria@email.com",
        senha: "senha456",
        nascimento: "1997-09-20",
        cpf: "987.654.321-00",
      },
      {
        nome: "Pedro Almeida",
        email: "pedro@email.com",
        senha: "senha789",
        nascimento: "1999-05-10",
        cpf: "111.222.333-44",
      },
      {
        nome: "Ana Souza",
        email: "ana@email.com",
        senha: "senha555",
        nascimento: "2000-01-25",
        cpf: "555.666.777-88",
      },
      {
        nome: "Isabela Lima",
        email: "isabela@email.com",
        senha: "senha999",
        nascimento: "2001-08-02",
        cpf: "777.888.999-00",
      },
      {
        nome: "Lucas Pereira",
        email: "lucas@email.com",
        senha: "senha777",
        nascimento: "1998-11-14",
        cpf: "888.999.000-11",
      },
      {
        nome: "Camila Oliveira",
        email: "camila@email.com",
        senha: "senha333",
        nascimento: "2002-04-30",
        cpf: "999.000.111-22",
      },
    ];

    // Crie os candidatos no banco de dados
    await Candidato.bulkCreate(candidatosData);

    console.log("Candidatos criados com sucesso.");
  } catch (error) {
    console.error("Erro ao criar candidatos:", error);
  }
}

async function criarVagas() {
  try {
    await Vaga.sync({ force: true }); // Isso irá criar a tabela 'vaga'

    // Array de dados de vagas
    const vagasData = [
      {
        codigo: 1,
        empresa: "Google",
        cargaHoraria: 20,
        bolsa: 800.0,
        descricao: "Estágio em Desenvolvimento Web",
      },
      {
        codigo: 2,
        empresa: "Microsoft",
        cargaHoraria: 30,
        bolsa: 1000.0,
        descricao: "Estágio em Machine Learning",
      },
      {
        codigo: 3,
        empresa: "Amazon",
        cargaHoraria: 25,
        bolsa: 900.0,
        descricao: "Estágio em Banco de Dados",
      },
      {
        codigo: 4,
        empresa: "Apple",
        cargaHoraria: 20,
        bolsa: 750.0,
        descricao: "Estágio em Desenvolvimento Mobile",
      },
      {
        codigo: 5,
        empresa: "Facebook",
        cargaHoraria: 15,
        bolsa: 700.0,
        descricao: "Estágio em Desenvolvimento Front-End",
      },
      {
        codigo: 6,
        empresa: "IBM",
        cargaHoraria: 35,
        bolsa: 1200.0,
        descricao: "Estágio em Segurança da Informação",
      },
      {
        codigo: 7,
        empresa: "Intel",
        cargaHoraria: 20,
        bolsa: 900.0,
        descricao: "Estágio em Ciência de Dados",
      },
      {
        codigo: 8,
        empresa: "Oracle",
        cargaHoraria: 25,
        bolsa: 800.0,
        descricao: "Estágio em Testes de Software",
      },
    ];

    // Crie as vagas no banco de dados
    await Vaga.bulkCreate(vagasData);

    console.log("Vagas criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar vagas:", error);
  }
}

async function criarRelacaoVagaCandidato() {
  candidatoParticiparDeVaga(
    "23f65e91-8bf5-41c5-b1db-464168db6f5d",
    "6b9f0c3b-de03-4839-af69-43ccde64f716",
  );

  candidatoParticiparDeVaga(
    "0e0667dc-92b1-4d66-a11c-aa84a4f44573",
    "25c6ace2-fd86-4cc4-841c-bcc9194c3c6a",
  );

  candidatoParticiparDeVaga(
    "f3047d16-18fd-47f6-8401-1082683957c6",
    "59fd0395-8a48-485c-a45d-0cc4ee14aa4c",
  );

  candidatoParticiparDeVaga(
    "0aa42b0e-e885-45c7-a808-48bc7cb6ff00",
    "5b07e8ca-8e84-433d-86ac-f39b0a714b5e",
  );

  candidatoParticiparDeVaga(
    "4b65c044-bdca-4fce-84c0-ad09c89c14da",
    "60132ea8-65ab-419b-b26e-67451ccdfd0d",
  );

  candidatoParticiparDeVaga(
    "1b0af4cb-b81b-4a02-877a-851370040fa9",
    "63acb124-e426-4226-93c5-464ca6a967bc",
  );

  candidatoParticiparDeVaga(
    "15d5424e-e1c9-4ee6-97fd-9b01de4f5b0e",
    "da8b8fed-ac9d-4cb9-9545-f4af558909b8",
  );
}

async function criarRepresentantes() {
  try {
    await Representante.sync({ force: true }); // Isso irá criar a tabela 'representante'

    // Array de dados de representantes
    const representantesData = [
      {
        nome: "Julia Santos",
        email: "festapanda@email.com",
        senha: "PtDmNbr67BtTH",
        cpf: "039.015.811-97",
      },
      {
        nome: "Lucas Silva",
        email: "unicornsrock@email.com",
        senha: "j6DgMp4rpnhPB",
        cpf: "980.203.181-00",
      },
      {
        nome: "Mariana Alves",
        email: "surfistasdoespaco@email.com",
        senha: "QNJ79N8NnHpjp",
        cpf: "805.513.601-78",
      },
      {
        nome: "Rafael Costa",
        email: "amantedechocolate@email.com",
        senha: "2t7mRjD2dhJmd",
        cpf: "462.736.741-40",
      },
      {
        nome: "Isabel Martins",
        email: "viajantetemporal@email.com",
        senha: "bFdQhMGRfDFHt",
        cpf: "177.793.711-66",
      },
      {
        nome: "Gustavo Lima",
        email: "sorvetedepizza@email.com",
        senha: "gF2f2Jq7Db6pt",
        cpf: "239.433.701-00",
      },
      {
        nome: "Paulo Oliveira",
        email: "amigodoalien@email.com",
        senha: "gDffPmH8b7DbJ",
        cpf: "916.340.481-80",
      },
    ];

    // Crie os representantes no banco de dados
    await Representante.bulkCreate(representantesData);

    console.log("Representantes criados com sucesso.");
  } catch (error) {
    console.error("Erro ao criar representantes:", error);
  }
}

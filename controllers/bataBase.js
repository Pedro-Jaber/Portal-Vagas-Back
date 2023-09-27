const Candidato = require("../model/candidato");
const Vaga = require("../model/vaga");

module.exports.createCand = async (req, res) => {
  // criarCandidatos();
  // criarVagas();
  res.send("criado");
};

module.exports.selectCand = async (req, res) => {
  const candidatos = await Candidato.findAll();
  const vagas = await Vaga.findAll();

  res.send([candidatos, vagas]);
};

async function criarCandidatos() {
  try {
    await Candidato.sync({ force: true }); // Isso irá criar a tabela 'candidato'

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
        cargaHoraria: 20,
        bolsa: 800.0,
        descricao: "Estágio em Desenvolvimento Web",
      },
      {
        cargaHoraria: 30,
        bolsa: 1000.0,
        descricao: "Estágio em Machine Learning",
      },
      {
        cargaHoraria: 25,
        bolsa: 900.0,
        descricao: "Estágio em Banco de Dados",
      },
      {
        cargaHoraria: 20,
        bolsa: 750.0,
        descricao: "Estágio em Desenvolvimento Mobile",
      },
      {
        cargaHoraria: 15,
        bolsa: 700.0,
        descricao: "Estágio em Desenvolvimento Front-End",
      },
      {
        cargaHoraria: 35,
        bolsa: 1200.0,
        descricao: "Estágio em Segurança da Informação",
      },
      {
        cargaHoraria: 20,
        bolsa: 900.0,
        descricao: "Estágio em Ciência de Dados",
      },
      {
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

const {
  candidatoParticiparDeVaga,
  candidatoSaiDeVaga,
} = require("../model/vagaCandidato");

module.exports.candidatar = async (req, res) => {
  const { candidatoID, vagaID } = req.body;

  try {
    candidatoParticiparDeVaga(candidatoID, vagaID);
    res.status(200).json({ mensagem: "ok" });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

module.exports.descandidatar = async (req, res) => {
  const { candidatoID, vagaID } = req.body;

  try {
    candidatoSaiDeVaga(candidatoID, vagaID);
    res.status(200).json({ mensagem: "ok" });
  } catch (error) {
    res.status(500).send("500 Internal Server Error: " + error);
  }
};

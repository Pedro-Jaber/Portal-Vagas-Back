let contadorInput = 1;

// TODO transformar em addEventListener
// Adiciona mais um campo de habilidade no formulário
function addHabilidade() {
  contadorInput++;

  let habilidade = document.getElementById("inputHabilidade1");
  let novaHabilidade = habilidade.cloneNode(true);

  novaHabilidade.id = "inputHabilidade" + contadorInput;

  novaHabilidade.querySelector("#inputHabilidade1").name =
    "habilidade" + contadorInput;
  novaHabilidade.querySelector("#inputHabilidade1").value = "";
  novaHabilidade.querySelector("#inputHabilidade1").id =
    "inputHabilidade" + contadorInput;

  novaHabilidade.querySelector("#inputNivelHabilidade1").name =
    "nivelHabilidade" + contadorInput;
  novaHabilidade.querySelector("#inputNivelHabilidade1").value = "";
  novaHabilidade.querySelector("#inputNivelHabilidade1").id =
    "inputNivelHabilidade" + contadorInput;

  let divHabilidadesInput = document.getElementById("habilidadesInput");

  divHabilidadesInput.appendChild(novaHabilidade);
}

// TODO transformar em addEventListener
function candidatar(candidatoID, vagaID) {
  const info = {
    candidatoID,
    vagaID,
  };

  fetch("/relations/candidatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((data) => {
    window.location.reload();
  });
}

// TODO transformar em addEventListener
function descandidatar(candidatoID, vagaID) {
  const info = {
    candidatoID,
    vagaID,
  };

  fetch("/relations/descandidatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((data) => {
    window.location.reload();
  });
}

function criarVaga(empresa, cargaHoraria, bolsa, descricao, representanteId) {
  const info = {
    empresa,
    cargaHoraria,
    bolsa,
    descricao,
    representanteId,
  };

  fetch("/representante/criar-vaga", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((data) => {
    window.location.reload();
  });
}

function selecionarCandidatoJS(vagaId, candidatoId) {
  // alert(`Candidato Selecionado ${vagaId} ${candidatoId}`);
  const info = {
    vagaId,
    candidatoId,
  };

  fetch("/representante/selecionar-candidato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((data) => {
    window.location.reload();
  });
}

function eliminarCandidatoJS(vagaId, candidatoId) {
  // alert(`Candidato Eliminado ${vagaId} ${candidatoId}`);
  const info = {
    vagaId,
    candidatoId,
  };

  fetch("/representante/eliminar-candidato", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  }).then((data) => {
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formularioVaga");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const empresa = document.getElementById("inputEmpresa").value;
    const cargaHoraria = document.getElementById("inputCargaHoraria").value;
    const bolsa = document.getElementById("inputBolsa").value;
    const descricao = document.getElementById("inputDercricao").value;
    const representanteId = document.getElementById("representanteId").value;
    criarVaga(empresa, cargaHoraria, bolsa, descricao, representanteId);
  });

  console.log(formulario);
});

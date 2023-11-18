let contadorInput = 1;

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

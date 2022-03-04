import { Jokenpo } from "./model/jokenpo.js";
import { armazenadorDeElementos } from "./db/db.js";

const listaDeAlternativas = document.getElementById("alternativas_lista");
const itemEscolhido = document.getElementById("resultado-item1");
const itemEscolhidoPelaMaquina = document.getElementById("resultado-item2");

const resultMessage = document.getElementById("resultMessage");

const pedra = new Jokenpo("Pedra", "./src/images/stone.png", 1);
const papel = new Jokenpo("Papel", "./src/images/sheet.png", 2);
const tesoura = new Jokenpo("Tesoura", "./src/images/scissor.png", 3);

let jokenpoArr = [pedra, papel, tesoura];

function createChooseList() {
  jokenpoArr.forEach((item) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = item.img;
    p.innerText = item.nome;
    li.id = item.id;

    li.appendChild(img);
    li.appendChild(p);
    listaDeAlternativas.appendChild(li);
  });
}
createChooseList();

listaDeAlternativas.addEventListener("click", verificarResutlado);

function verificarResutlado(event) {
  let img = event.target;
  if (img.tagName !== "IMG") {
    return false;
  }
  if (img.tagName === "IMG") {
    armazenadorDeElementos.itemSelecionado.push(Number(img.parentElement.id));
    escolhaAleatória(1, 4);
  }
  posicionandoImagensNoResultado();
  escolhendoVencedor();
  armazenadorDeElementos.itemSelecionado.length = 0;
}

function escolhaAleatória(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min)) + min;

  jokenpoArr.forEach((item) => {
    if (result === item.id) {
      armazenadorDeElementos.itemSelecionado.push(item);
    }
  });
}

function posicionandoImagensNoResultado() {
  jokenpoArr.forEach((item) => {
    if (item.id === armazenadorDeElementos.itemSelecionado[0]) {
      itemEscolhido.src = item.img;
    }
  });
  jokenpoArr.forEach((item) => {
    if (item.id === armazenadorDeElementos.itemSelecionado[1].id) {
      itemEscolhidoPelaMaquina.src = item.img;
    }
  });
}
// pedra: 1
// papel:2
// tesoura 3;
function escolhendoVencedor() {
  let item1 = armazenadorDeElementos.itemSelecionado[0];
  let item2 = armazenadorDeElementos.itemSelecionado[1].id;
  const victoryMsg = "Você ganhou!!!";
  const loseMsg = "Você perdeu!";
  //Condições para a pedra

  if (item1 === item2) {
    resultMessage.innerText = "Empate!";
  } else if (item1 === 1 && item2 === 3) {
    resultMessage.innerText = victoryMsg;
  } else if (item1 === 1 && item2 === 2) {
    resultMessage.innerText = loseMsg;
  } else if (item1 === 2 && item2 === 1) {
    resultMessage.innerText = victoryMsg;
  } else if (item1 === 2 && item2 === 3) {
    resultMessage.innerText = loseMsg;
  } else if (item1 === 3 && item2 === 2) {
    resultMessage.innerText = victoryMsg;
  } else if (item1 === 3 && item2 === 1) {
    resultMessage.innerText = loseMsg;
  } else {
    alert("recarregue a página");
  }
}
// Agora preciso ver como gerar aleatoriamente um inteiro entre 1 e 3
// Armazenar esse valor aleatoriamente escolhido numa variavel x
// fazer uma forEach no jokenpoArr
// se o id de um elemento for igual a x, adicionar o elemento ao array itemSelecionado
// A partir daí começar verificações

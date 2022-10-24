let qtdCartas;
let qtdClicks;

const baralho = [
  'bobrossparrot.gif',
  'explodyparrot.gif',
  'fiestaparrot.gif',
  'metalparrot.gif',
  'revertitparrot.gif',
  'tripletsparrot.gif',
  'unicornparrot.gif'
];

let cartasClicadas = [];

function escolhaQuantasCartas() {
  qtdClicks = 0;
  cartasClicadas = [];
  
  qtdCartas = prompt('Com quantas cartas você quer jogar? Escolha de 4 a 14 cartas. (Somente numeros pares)');

  if (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0)
    return escolhaQuantasCartas();

  for (let i = 0; i < (qtdCartas / 2); i++) {
    cartasClicadas.push(baralho[i]);
    cartasClicadas.push(baralho[i]);
  }

  comecarJogo();
}

function compararCarta() { 
	return Math.random() - 0.5; 
}

function comecarJogo() {
    const cardsElement = document.getElementsByClassName('cartas')[0];

  let cardsText = '';

  cartasClicadas.sort(compararCarta);
  for (let i = 0; i < cartasClicadas.length; i++) {
    cardsText += `
      <div class="carta carta-${cartasClicadas[i]}" onclick="desvirarCarta(this, '${cartasClicadas[i]}')">
        <div class="face back-face">
          <img src="./img/back.png">
        </div>
        <div class="face front-face">
          <img src="./img/${cartasClicadas[i]}">
        </div>
      </div>`;
  }

  cardsElement.innerHTML = cardsText;
}

function desvirarCarta(el, id) {
  qtdClicks++;

  const cartasClicadas = document.getElementsByClassName('selecionado');
  qtdCartasClicadas = cartasClicadas.length;
  primeiroSelecionado = cartasClicadas[0];

  if (qtdCartasClicadas == 2)
    return false;

  el.classList.add('selecionado');
  
  // procurar cartas viradas;
  if (qtdCartasClicadas == 1) {
    // vendo se tem pares
    if (primeiroSelecionado.classList.contains(`carta-${id}`)) {
      cartasClicadas[1].classList.add('pares');
      cartasClicadas[0].classList.add('pares');
      cartasClicadas[1].classList.remove('selecionado');
      cartasClicadas[0].classList.remove('selecionado');

      cartasQueSaoPares = document.getElementsByClassName('pares');
       // veririficar se todos os pares foram encontrados
      //jogador vence quando todos os pares forem virados  
      if (cartasQueSaoPares.length == qtdCartas) {
           alert(`Você ganhou!`);
        }
      // senão, vire as cartas
    } else {
      setTimeout(() => {
        cartasClicadas[1].classList.remove('selecionado');
        cartasClicadas[0].classList.remove('selecionado');
      }, 1000);
    }
  }
}

escolhaQuantasCartas();


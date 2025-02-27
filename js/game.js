const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'benzema',
    'bruno-fernandes',
    'cristiano',
    'dybala',
    'griezmann',
    'ibrahimovic',
    'messi',
    'neymar',
    'salah',
    'vini-jr',
];

// Função que cria um novo elemento HTML com uma tag e uma classe
const createElement = (tag, className) => {
  // Cria o elemento HTML usando o método createElement() e a tag passada como argumento
  const element = document.createElement(tag);
  
  // Adiciona a classe CSS ao elemento criado
  element.className = className;

  // Retorna o novo elemento criado
  return element;
}

// Variáveis para armazenar as cartas selecionadas pelo jogador
let firstCard = '';  // Armazena a primeira carta selecionada
let secondCard = ''; // Armazena a segunda carta selecionada


// Função que verifica se o jogo terminou
const checkEndGame = () => {
  // Seleciona todas as cartas que têm a classe 'disabled-card' (cartas que foram acertadas)
  const disabledCards = document.querySelectorAll('.disabled-card');

  // Se o número de cartas desativadas for igual a 20 (todas as cartas foram acertadas)
  if (disabledCards.length === 20) {
    // Para o temporizador do jogo (loop de contagem de tempo)
    clearInterval(this.loop);

    // Exibe uma mensagem de parabéns com o nome do jogador e o tempo total
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

// Função que verifica se as duas cartas selecionadas são iguais
const checkCards = () => {
  // Obtém o valor do atributo 'data-character' das duas cartas selecionadas
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  // Verifica se as cartas têm o mesmo valor de 'data-character'
  if (firstCharacter === secondCharacter) {

    // Se as cartas forem iguais, adiciona a classe 'disabled-card' às cartas para desativá-las
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Limpa as variáveis de cartas selecionadas
    firstCard = '';
    secondCard = '';

    // Verifica se o jogo terminou (todas as cartas foram combinadas)
    checkEndGame();

  } else {
    // Se as cartas não forem iguais, esconde elas após um curto intervalo
    setTimeout(() => {

      // Remove a classe 'reveal-card' que exibe as cartas
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      // Limpa as variáveis de cartas selecionadas
      firstCard = '';
      secondCard = '';

    }, 500);  // Aguarda 500ms antes de virar as cartas de volta
  }
}


const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}


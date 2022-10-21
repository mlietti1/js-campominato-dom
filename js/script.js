const main = document.querySelector('.game-wrapper');
const playBtn = document.querySelector('#play');
const levelSelect = document.querySelector('#level'); //select element in html

const gridLevels = [100, 81, 49];
const BOMBS_NUMBER = 16;
let bombs = [];
let score = 0;



playBtn.addEventListener('click', play);

function play(){
  // stabilisco il numero delle celle a seconda del value html
  const cellNumbers = levelSelect.value; 

  reset()

  //generare la griglia
  generatePlayground(cellNumbers);

  // creo le bombe
  bombs = generateBombs(cellNumbers);
  console.log(bombs)

}

function generatePlayground(cellNumbers){
  //creo gliglia

  const grid = document.createElement('div');
  grid.className = 'grid';

  //genero celle

  for(let i = 1; i <= cellNumbers; i++){
    const cell = generateCell(i, cellNumbers);

    grid.append(cell);

  } 
  main.append(grid) 
}

function generateCell(cellId, cellNumbers){
  const cell = document.createElement('div');
  cell.className = 'cell';

  // creo stringa della classe in base alla griglia
  cell.classList.add('square'+cellNumbers);

  //creo proprietà custom per assegnare l'id della cella
  cell.cellId = cellId;
  cell.innerHTML = `<span>${cellId}</span>`;

  // aggiungo event al click per la cella
  cell.addEventListener('click', handleClickCell);

  return cell;
}


// funzione per vedere cosa succede al click
function handleClickCell(){
  
  console.log(this.cellId)
  // contare tentativi
  
  if(!bombs.includes(this.cellId)){
    
    // cella senza bomba si illumina
    this.classList.add('clicked'); //css per accendere cella cliccata
    // aumento il punteggio che andrò a restituire alla fine
    score++;

    // creo collection di celle senza bomba per far finire il gioco se le clicco tutte

    const cells = document.getElementsByClassName('cell');

    // gioco finisce se celle cliccare pari a celle tot meno bombe
    if(score === cells.length - BOMBS_NUMBER){

      // creare funzione per far finire il gioco e vinco

      endGame(true);
    }
  }else{
    endGame(false);
  }

}

// funzione che ci dice risultato a gioco finito

function endGame(isWon){
  // creo messaggio da stampare
  let msg;
  const cells = document.getElementsByClassName('cell');

  if(isWon){
    msg = `Congrats! You completed the game!`;
  }else{
    msg = `Game over. Your score: ${score}/${cells.length - BOMBS_NUMBER}`;
  }

  // stampo il messaggio
  document.querySelector('.endMessage').innerHTML = msg;
  
  // devo crare funzione per far vedere le bombe alla fine
  showBombs();
  
  // rendo il gioco non cliccabile con un elemento sopra
  const gameOver = document.createElement('div');
  gameOver.className = 'end-game-level';
  // lo metto nel dom
  document.querySelector('.game-wrapper').append(gameOver);
}

// funzione per vedere le bombe

function showBombs() {
  // faccio passare in un ciclo tutte le celle e quando trovo id bomba aggiungo la classe bomb
  const cells = document.getElementsByClassName('cell');

  for(let i = 0; i < cells.length; i++){

    const cell = cells[i];

    // se i è in array bombe agggiungo classe 
    if(bombs.includes(cell.cellId)){
      cell.classList.add('bomb');
    }
  }
}

function generateBombs(cellNumbers){
  // creo un array dove pushare le bombe che creo
  const bombGenerated = [];

  // ciclo finché ho 16 bombe 
  while (bombGenerated.length < BOMBS_NUMBER){
    const bomb = getRandomNumber(1, cellNumbers);

    // se numero bomba estratto non è nell'array delle bombe lo pusho
    if(!bombGenerated.includes(bomb)){
      bombGenerated.push(bomb);
    }
  }
  // restituisco il numero di bombe generate
  return bombGenerated;
}

function reset(){
  main.innerHTML = '';
  document.querySelector('.endMessage').innerHTML = '';
  score = 0;
}

// creo function per numero random per generare le bombe

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
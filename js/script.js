const main = document.querySelector('.game-wrapper');
const playBtn = document.querySelector('#play');
const levelSelect = document.querySelector('#level'); //select element in html

const gridLevels = [100, 81, 49];


playBtn.addEventListener('click', play);

function play(){
  // stabilisco il numero delle celle a seconda del value html
  const cellNumbers = levelSelect.value; 

  reset()

  //generare la griglia
  generatePlayground(cellNumbers);

}

function generatePlayground(cellNumbers){
  //creo gliglia

  const grid = document.createElement('div');
  grid.className = 'grid';

  //genero celle

  for(let i = 0; i < cellNumbers; i++){
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
  cell.innerHTML = `<span>${cellId + 1}</span>`;

  cell.addEventListener('click', handleClickCell);

  return cell;
}

function handleClickCell(){
  
  // contare tentativi
  console.log(this.cellid)
  this.classList.add('clicked'); //css per accendere cella cliccata
}

function reset(){
  main.innerHTML = '';
  document.querySelector('.endMessage').innerHTML = '';
}
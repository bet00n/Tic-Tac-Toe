const cells = document.querySelectorAll('.cell:not(.taken)');
const playersTokenDisplay = document.querySelector('h2 span');


const xToken = '<i class="fa-solid fa-x"></i>';
const circleToken = '<i class="fa-solid fa-o"></i>';
let playersToken;
let botsToken;

const handleCellClick = (clickedCellEl) => {
    const clickedCell = cells[clickedCellEl.target.getAttribute('data-cell-index')];
    if (clickedCell.classList.contains('taken')) {
        alert ('You can\'t play there!');
    } else {
        clickedCell.classList.add('taken');
        clickedCell.innerHTML = playersToken;
        botMove();
    }
}

cells.forEach((cell)=> {
    cell.addEventListener('click', handleCellClick)
});

const assingTokens = () => {
    playersToken = (Math.random()-0.5)>0 ? xToken : circleToken;
    playersTokenDisplay.innerHTML = playersToken;
    botsToken = playersToken == xToken ? circleToken : xToken;
}

const botMove = () => {
    const availableCells = document.querySelectorAll('.cell:not(.taken)');
    console.log(availableCells);
    const chosenCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    setTimeout (() => {
        chosenCell.classList.add('taken');
        chosenCell.innerHTML = botsToken;
    }, 2000)
    .then() {
        freezeClic = true;
    };
}

assingTokens();

let freezeClic = false; // just modify that variable to disable all clics events

document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);
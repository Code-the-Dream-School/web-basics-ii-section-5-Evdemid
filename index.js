Copy;

//Create Players
let player1 = {
  name: "a",
  shipCount: 0,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};
let player2 = {
  name: "b",
  shipCount: 0,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

//******************* Variables **************************
const board_player1 = document.getElementById("board_player1");
const board_player2 = document.getElementById("board_player2");
let currentPlayer;
let opponent;
let activeBoard;
let inactiveBoard;
let turnLabel = document.getElementById("turn_player");

const player1ShipCount = document.querySelector("#ships_player1");
const player2ShipCount = document.querySelector("#ships_player2");

//Players' Names
player1.name = prompt("Player #1 type your name");
const player1Label = document.querySelector("#name_player1");
player1Label.textContent = player1.name;
player2.name = prompt("Player #2 type your name");
const player2Label = document.querySelector("#name_player2");
player2Label.textContent = player2.name;

//*****************Randomly Add Ships to each Board*****************
//alert("Your ships are being put on alert... Be ready for the battle");

const boardSetup = (player) => {
  for (let i = 0; player.shipCount < 4; i++) {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    if (player.gameBoard[x][y] === 1) {
      continue;
    }
    player.shipCount++;
    player.gameBoard[x][y] = 1;
  }
  return player.gameBoard;
};
boardSetup(player1);
boardSetup(player2);

//***************Set up a beginner.*****************
//coin toss: 50/50
function setBeginner() {
  let coin = Math.floor(Math.random() * 2 + 1);
  if (coin === 1) {
    currentPlayer = player1;
    opponent = player2;
    activeBoard = board_player2;
    inactiveBoard = board_player1;
    player1ShipCount.textContent = currentPlayer.shipCount;
    player2ShipCount.textContent = opponent.shipCount;
  } else if (coin !== 1) {
    currentPlayer = player2;
    opponent = player1;
    activeBoard = board_player1;
    inactiveBoard = board_player2;
    player2ShipCount.textContent = currentPlayer.shipCount;
    player1ShipCount.textContent = opponent.shipCount;
  }

  turnLabel.textContent = currentPlayer.name;
}
setBeginner();

console.log(opponent.gameBoard); //=========================debugging
console.log(currentPlayer.gameBoard);

//******************The main game flow**********************
const launchGame = (player) => {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement("li"); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement("div");
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`; // saves the coordinates as a string value 'x,y'

      cell.value = player.gameBoard[x][y]; //state of the cell

      //this function adds the click event to each cell
      cell.addEventListener("click", (e) => {
        if (activeBoard.contains(cell)) {
          //validation of the board

          [currentPlayer, opponent] = [opponent, currentPlayer]; // switch players and boards
          [activeBoard, inactiveBoard] = [inactiveBoard, activeBoard];

          turnLabel.textContent = currentPlayer.name;

          let cell = e.target; // get the element clicked

          if (cell.value === 1) {
            //condition for hit

            alert("Hit!");
            cell.style.background = "red";
            opponent.shipCount--;
            if (player1 === opponent) {
              //update of shipcount label content after hit
              player2ShipCount.textContent -= 1;
            } else {
              player1ShipCount.textContent -= 1;
            }
          } else if (cell.value === 0) {
            //condition for the failure
            cell.style.background = "blue";
            alert("Miss!!");
          }
          if (opponent.shipCount === 0) {
            alert(
              `Congrats ${opponent.name}! You are the winner! and the great naval commander!`
            );
          }
        }
      });

      li.appendChild(cell); //adding each cell into the row number x
    }
    if (player === player1) {
      board_player1.appendChild(li);
    } else if (player === player2) {
      board_player2.appendChild(li);
    }
  }
};

launchGame(player1);
launchGame(player2);

//Reset and New Game

const buttons = document.getElementById("buttons");
//create buttons
const newGameBtn = document.createElement("button");
const resetBtn = document.createElement("button");
//attach text content to buttons
newGameBtn.innerHTML = "New Game";
resetBtn.innerHTML = "Reset Game";
buttons.appendChild(resetBtn); //add new elements to their parents
buttons.appendChild(newGameBtn);
resetBtn.addEventListener("click", resetGame); //set a listener to clicks on the button for reset with a reference to the function declared beneath

player1.ships = 0;
player2.ships = 0;


//reset the game with the same players
function resetGame() {
  player1.ships = 0;
  player2.ships = 0;
  player1.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  player2.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  
  board_player1.innerHTML = ""; // clear content of elements
  board_player2.innerHTML = "";
  boardSetup(player1); //reset boats position
  boardSetup(player2);
    //set up new game flow
  setBeginner();
  launchGame(player1);
  launchGame(player2);
  player1ShipCount.textContent = player1.shipCount; // setup lives/ships numbers
  player2ShipCount.textContent = player2.shipCount;
}

//reloading for a new game
newGameBtn.addEventListener("click", () => {
  //set a listener to clicks on the button for reloading the page

  window.location.reload();
});

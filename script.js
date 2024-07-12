
let board;

let player1;
let player2;

let foundWinner;
let activePlayer;
let turnsPlayed;
let winCondition;
let winnerName = '';



const gameButtons = document.querySelectorAll('.symbolPlay');
let message = document.querySelector('.message');

const newGameButton = document.querySelector('.new-game-button');

newGameButton.addEventListener('click', ()=>{
    let playerOneInput = document.querySelector('#player-one');
    let playerTwoInput = document.querySelector('#player-two');

    if(playerOneInput.value != '' && playerTwoInput.value != ''){
     initGame(playerOneInput.value, playerTwoInput.value);
    }
}
);

gameButtons.forEach((e) => {
    e.addEventListener('click', (eB) => {
        let currentSymbol = activePlayer.symbol;
        let xcord = eB.target.attributes['data-x'].value;
        let ycord = eB.target.attributes['data-y'].value;
        let errCheck = play(board, xcord, ycord, activePlayer.symbol);
        if (errCheck != 'error') {
            eB.target.textContent = currentSymbol;
        }
    });
});

let activePlayerNameDOM = document.querySelector('.active-player-name');
let activePlayerSymbolDOM = document.querySelector('.active-player-symbol');

function updateCell(button, symbol) {
}
function updateInterface(p) {
    if (turnsPlayed == 9 && foundWinner == false) {
        message.textContent = 'GAME OVER. NO WINNER.';

    } else if (foundWinner) {
        message.textContent = `${winnerName} WINS!!!`;
    } else {
        message.textContent = `${p.name}, it's your turn. Place the ${p.symbol}`;
        activePlayerNameDOM.textContent = p.name;
        activePlayerSymbolDOM.textContent = p.symbol;
    }
}



function playerFactory(name, symbol) {
    symbol = symbol.toUpperCase();
    if (symbol != 'X' && symbol != 'O') {
        return new Error('wrong symbol');
    }
    return { name, symbol }
}

function gameBoardGenerator(size) {
    let boardX = new Array(size);

    for (let i = 0; i < boardX.length; i++) {
        boardX[i] = new Array(size);
    }
    return boardX;
}

function initGame(playerOneName, playerTwoName) {

    board = gameBoardGenerator(3);

    player1 = playerFactory(playerOneName, 'X');
    player2 = playerFactory(playerTwoName, 'O');
        winnerName = '';

    foundWinner = false;
    activePlayer = player1;
    turnsPlayed = 0;
    winCondition = 'none';
    updateInterface(activePlayer);

    gameButtons.forEach((e) => {
        e.textContent = '';
    });



}




function play(board, x, y, symbol) {
    if (symbol != 'X' && symbol != 'O') {
        return 'error';
    };
    if (board[x][y] != null) {
        return 'error';
    }
    board[x][y] = symbol;
    turnsPlayed++;



    let checkVictoryWinner = checkVictory(board);

    if (checkVictoryWinner != 'none') {
        foundWinner = true;
        winner = checkVictoryWinner;
        console.log(winnerName);
        if (winnerName == '') {
            winnerName = activePlayer.name;
        }
        console.log('winner is ' + checkVictoryWinner);
    }

    if (activePlayer == player1) {
        activePlayer = player2;
    } else { activePlayer = player1; }   
     updateInterface(activePlayer);

    return board;
}

function checkVictory(board) {
    let vert, hor, dia;

    vert = verticalCheck(board);
    hor = horizontalCheck(board);
    dia = diagonalCheck(board);

    if (vert != 'none') {
        return vert;
    } else if (hor != 'none') {
        return hor;
    } else if (dia != 'none') {
        return dia;
    } else {
        return 'none';
    }


}

function verticalCheck(board) {

    let winningCondition = board.length;
    let xCount = 0;
    let oCount = 0;
    winner = 'none';

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == 'X') {
                xCount++;
            } else if (board[i][j] == 'O') {
                oCount++;
            }

            if (j == board.length - 1) {
                if (xCount == winningCondition) {
                    winner = 'X';
                    break;
                }
                else if (oCount == winningCondition) {
                    winner = 'O';
                    break;
                } else {
                    xCount = 0;
                    oCount = 0;
                }
                //reset fields after iterating;


            }

        }

    }
    return winner;
}
function horizontalCheck(board) {

    let winningCondition = board.length;
    let xCount = 0;
    let oCount = 0;
    winner = 'none';

    for (let j = 0; j < board.length; j++) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] == 'X') {

                xCount++;
            } else if (board[i][j] == 'O') {
                oCount++;
            }


            if (i == board.length - 1) {

                if (xCount == winningCondition) {
                    winner = 'X';

                    break;
                }
                else if (oCount == winningCondition) {
                    winner = 'O';


                    break;
                } else {

                    xCount = 0;
                    oCount = 0;
                }
                //reset fields after iterating;


            }

        }

    }
    return winner;
}

function diagonalCheck(board) {
    let winningCondition = board.length;

    let xCount = 0;
    let oCount = 0;

    let winner = 'none';

    //left to right

    for (let i = 0; i < board.length; i++) {
        if (board[i][i] == 'X') {
            xCount++;
        } else if (board[i][i] == 'O') {
            oCount++;
        }
        if (i == board.length - 1) {
            if (xCount == winningCondition) {
                winner = 'X';
                break;
            }
            else if (oCount == winningCondition) {
                winner = 'O';
                break;
            } else {
                xCount = 0;
                oCount = 0;
                break;
            }
        }
    }

    //right to left
    if (winner == 'none') {

        let verticalCoord = 0

        for (let i = board.length - 1; i >= 0; i--) {
            if (board[i][verticalCoord] == 'X') {
                xCount++;
            } else if (board[i][verticalCoord] == 'O') {
                oCount++;
            }

            if (verticalCoord == 2) {
                if (xCount == winningCondition) {
                    winner = 'X';
                    break;
                }
                else if (oCount == winningCondition) {
                    winner = 'O';

                    break;
                } else {
                    break;
                }
            }

            verticalCoord++;
        }
    }
    return winner;
}


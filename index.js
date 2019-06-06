/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = true; // True -> X, False -> O
let gameOver = false;
const winner = document.getElementById("winner");

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columsStyle">' + columnDivs + '</div>';
}

function printGrid() {
    for(let cols = 0; cols < GRID_LENGTH; cols++) {
        console.log(grid[cols]);
    }
}

function checkXWins(rowIdx, colIdx) {
    let rowAndFlag = 1;
    let colAndFlag = 1;
    let sumRow = 0;
    let sumCol = 0;
    for(let idx = 0; idx < GRID_LENGTH; idx++) {
        rowAndFlag &= grid[colIdx][idx];
        sumRow += grid[colIdx][idx];
        colAndFlag &= grid[idx][rowIdx];
        sumCol += grid[idx][rowIdx];
        if((rowAndFlag === 1 && sumRow === 3) || (colAndFlag === 1 && sumCol === 3)) {
            winner.innerHTML = "X Wins!";
            gameOver = true;
            break;
        }
    }   
}

function checkOWins(rowIdx, colIdx) {
    let rowAndFlag = 2;
    let colAndFlag = 2;
    let sumRow = 0;
    let sumCol = 0;
    for(let idx = 0; idx < GRID_LENGTH; idx++) {
        rowAndFlag &= grid[colIdx][idx];
        sumRow += grid[colIdx][idx];
        colAndFlag &= grid[idx][rowIdx];
        sumCol += grid[idx][rowIdx];
        if((rowAndFlag === 2 && sumRow === 6) || (colAndFlag === 2 && sumCol === 6)) {
            winner.innerHTML = "O Wins!";
            gameOver = true;
            break;
        }
    }   
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = -1;
    if (turn == true) {
        newValue = 1;
    } else {
        newValue = 2;
    }
    if (grid[colIdx][rowIdx] === 0 && gameOver == false) {
        grid[colIdx][rowIdx] = newValue;
        turn = !turn;
    }
    console.log(colIdx, rowIdx);
    renderMainGrid();
    addClickHandlers();

    checkXWins(rowIdx, colIdx);
    checkOWins(rowIdx, colIdx);
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();

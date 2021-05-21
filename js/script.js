let cells = document.querySelectorAll(".game-field__item"),
    restartBtn = document.querySelector(".btn-to__restart"),
    undoBtn = document.querySelector(".btn-to__undo"),
    message = document.querySelector(".game-message")

let stepCount = 0, // counter for steps
    playerName = "X" // first player name

let stepsX = [], // arrays for steps player "X"
    stepsO = [] // arrays for steps player "O"

const winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

/* 
|1|2|3|
 - - -|
|4|5|6|     - game field
 - - -
|7|8|9|
 */

// Click on UNDO btn
undoBtn.addEventListener("click", clickUndo)

function clickUndo() {
    if (stepCount) {
        playerName = playerName === "X" ? "O" : "X"
        playerName === "X" ? undoStep(stepsX) : undoStep(stepsO)
        
        message.innerText = `Player ${playerName}'s turn:`
        
        stepCount--
    }
}

function undoStep(playerSteps) {
    let lastStep = playerSteps.pop()

    cells.forEach((cell) => {
        if (cell.getAttribute("data-cell-num") == lastStep) {
            cell.innerText = ""
        }
    })
    
}

// Click on RESTART btn
restartBtn.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.innerText = ""
        stepsX = []
        stepsO = []
        stepCount = 0
        playerName = "X"
        message.innerText = `Player ${playerName}'s turn:`

        cells.forEach((cell) => {
            cell.addEventListener("click", cellClick)
        })
        undoBtn.addEventListener("click", clickUndo)
    })
})

// Click on CELL in GAME FIELD
cells.forEach((cell) => {
    cell.addEventListener("click", cellClick)
})

function cellClick() {
    if (!this.textContent) {
        let num = +this.getAttribute("data-cell-num")
        
        this.innerText = playerName;
        playerName === "X" ? stepsX.push(num) : stepsO.push(num)

        if ((stepsX.length > 2 || stepsO.length > 2) && (searchWinner(stepsX, num) || searchWinner(stepsO, num))) {
            cells.forEach((cell) => {
                cell.removeEventListener("click", cellClick)
            })
            undoBtn.removeEventListener("click", clickUndo)
            return (message.innerText = `Player ${playerName}'s WIN!!!!!`)
        }

        playerName = playerName === "X" ? "O" : "X"
        message.innerText = `Player ${playerName}'s turn:`

        if (stepCount < 9) {
            stepCount++
        }
    }
    else {
        message.innerText = `This field is already filled! Choose a free field...\nPlayer ${playerName}'s turn:`
    }
}

function searchWinner(playerSteps, cellNum) {
    for (let i = 0; i < winCombinations.length; i++) {
        let someWinArr = winCombinations[i],
            count = 0;
        if (someWinArr.indexOf(cellNum) !== -1) {
            for (var j = 0; j < someWinArr.length; j++) {
                if (playerSteps.indexOf(someWinArr[j]) !== -1) {
                    count++;
                    if (count === 3) {
                        return true;
                    }
                }
            }
            count = 0;
        }
    }
}
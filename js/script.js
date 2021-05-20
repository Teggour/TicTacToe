let cells = document.querySelectorAll(".game-field__item"),
    restartBtn = document.querySelector(".btn-to-restart"),
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
    })
})

cells.forEach((cell) => {
    cell.addEventListener("click", cellClick)
})

function cellClick() {
    let num = +this.getAttribute("data-cell-num")

    if (!this.textContent) {
        this.innerText = playerName;
        playerName === "X" ? stepsX.push(num) : stepsO.push(num)
        message.innerText = `Player ${playerName}'s turn:`
    }
    else {
        alert("This field is already filled! Choose a free field...")
    }

    if ((stepsX.length > 2 || stepsO.length > 2) && (searchWinner(stepsX, num) || searchWinner(stepsO, num))) {
        cells.forEach((cell) => {
            cell.removeEventListener("click", cellClick)
        })
        return (message.innerText = `Player ${playerName}'s WIN!!!!!`)
    }

    playerName = playerName === "X" ? "O" : "X"

    if (stepCount < 9) stepCount++
}

function searchWinner(arr, number) {
    for (let i = 0; i < winCombinations.length; i++) {
        let someWinArr = winCombinations[i],
            count = 0;
        if (someWinArr.indexOf(number) !== -1) {
            for (var j = 0; j < someWinArr.length; j++) {
                if (arr.indexOf(someWinArr[j]) !== -1) {
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

/*
function searchWinner(playerSteps, cellNum) {
    winCombinations.forEach(winCombo => {
        let count = 0
        if (winCombo.indexOf(cellNum) !== -1) {
            winCombo.forEach(item => {
                if (playerSteps.indexOf(item) !== -1) {
                    count++
                    console.log(count)
                    if (count === 3) {
                        console.log(count)
                        return true
                    }
                }
            })

            count = 0
        }
    })
}*/
let playerScore = 0
let computerScore = 0
let gameRound = 0


/*...... declaring game selection choice array...  */
const gameSelection = [
    {
        value: "rock",
        logo: `<img src="https://img.icons8.com/office/80/000000/rock.png"/>`
    },
    {
        value: "paper",
        logo: `<img src="https://img.icons8.com/fluency/96/000000/paper.png"/>`
    },
    {
        value: "scissors",
        logo: `<img src="https://img.icons8.com/color/96/000000/sewing-scissors.png"/>`
    }
]
/*....................................................... */

const userSelectionButtonEl = document.querySelectorAll(".user-selection")
const scoreBoardLightEl = document.querySelectorAll(".led-light")
const display = document.querySelectorAll(".selection-display")
const userDisplay = document.querySelector("#user-display")
const computerDisplay = document.querySelector("#computer-display")
const userScoreDisplatEl = document.querySelector("#player-score-display")
const computerScoreDisplatEl = document.querySelector("#computer-score-display")
const gameResultDisplayEl = document.querySelector(".game-result")
const homeContainer = document.querySelector("#game-start-container")
const gamePlayContainer = document.querySelector("#game-play-container")
const resultContainer = document.querySelector("#game-result-container")
const playAgainBtnEl = document.querySelector("#play-again-btn")
const homeBtnEl = document.querySelector("#back-btn")
const playBtnEl = document.querySelector("#play-btn")

gamePlayContainer.style.display = "none"
resultContainer.style.display = "none"

let computerPlay = () => {
    let randomSelection = gameSelection[Math.floor(Math.random() * gameSelection.length)]
    // console.log(randomSelection)
    return randomSelection
}

/* ..............Event Listener for user selection........... */
userSelectionButtonEl.forEach(option => {
    option.addEventListener("click", () => {
        let userChoice = gameSelection[option.id]
        let computerChoice = computerPlay()
        gamePlay(userChoice, computerChoice)


        /* disable button after all rounds completed */
        if (gameRound > 4) {
            for (item in userSelectionButtonEl)
                userSelectionButtonEl[item].disabled = true
        }
    })
})


let gamePlay = (userChoice, computerChoice) => {
    let userResult = ''
    let userValue = userChoice.value
    let computerValue = computerChoice.value
    if (userValue === computerValue) {
        userResult = 'draw'
    }

    else if (userValue === 'rock')
        if (computerValue === 'paper') {
            computerScore += 1
            userResult = 'lose'
        }
        else {
            userResult = 'win'
            playerScore += 1
        }

    else if (userValue === 'paper')
        if (computerValue === 'rock') {
            userResult = 'win'
            playerScore += 1
        }
        else {
            userResult = 'lose'
            computerScore += 1
        }
    else if (userValue === 'scissors')

        if (computerValue === 'rock') {
            userResult = 'lose'
            computerScore += 1
        }
        else {
            userResult = 'win'
            playerScore += 1
        }

    /* disable button after each click, will only be enable when lights are displayed */
    for (item in userSelectionButtonEl) {
        userSelectionButtonEl[item].disabled = true
    }

    setTimeout(displaySelection, 200, computerChoice, userChoice, userResult)
    setTimeout(displayLight, 1500, userResult)



}


let displaySelection = (computerChoice, userChoice) => {
    display.forEach(element => {
        element.style.display = "flex"

    })
    userDisplay.innerHTML = userChoice.logo
    computerDisplay.innerHTML = computerChoice.logo

    setTimeout(hideDisplay, 1500)

}



function hideDisplay() {
    display.forEach(element => {
        element.style.display = "none"
    })
}
/*........... Function to change LED lights score..... */
let displayLight = (userResult) => {
    scoreBoardLightEl[gameRound].classList.remove('led-blank')

    if (userResult == 'draw')
        scoreBoardLightEl[gameRound].classList.add('led-yellow')

    else if (userResult == 'win')
        scoreBoardLightEl[gameRound].classList.add('led-green')

    else
        scoreBoardLightEl[gameRound].classList.add('led-red')

    gameRound += 1

    // enabling button.............
    if (gameRound < 5) {
        for (item in userSelectionButtonEl)
            userSelectionButtonEl[item].disabled = false
    }
    if (gameRound == 5) {
        console.log(`computer score=${computerScore}, player score= ${playerScore}`)
        resultDisplay(computerScore, playerScore)
        resultContainer.style.display = "block"
        gamePlayContainer.style.display = "none"
    }
}

let resultDisplay = (computerScore, playerScore) => {
    userScoreDisplatEl.textContent = playerScore
    computerScoreDisplatEl.textContent = computerScore
    if (computerScore == playerScore)
        gameResultDisplayEl.textContent = 'Draw'
    else if (computerScore > playerScore)
        gameResultDisplayEl.textContent = "You Lose!"
    else
        gameResultDisplayEl.textContent = "You Win!"
}

playAgainBtnEl.addEventListener('click', () => {
    resetGame()
    resultContainer.style.display = "none"
    gamePlayContainer.style.display = "block"

})

let resetGame = () => {

    /* reset led lights................*/
    scoreBoardLightEl.forEach(element => {
        element.classList.remove('led-red')
        element.classList.remove('led-yellow')
        element.classList.remove('led-green')
        element.classList.add('led-blank')
    });

    /* reset scores............ */
    gameRound = 0
    playerScore = 0
    computerScore = 0
    userResult = ''

    /*enable users selection buttons */

    for (item in userSelectionButtonEl)
        userSelectionButtonEl[item].disabled = false

}

playBtnEl.addEventListener('click', () => {
    homeContainer.style.display = "none"
    gamePlayContainer.style.display = "block"

})

homeBtnEl.addEventListener('click', () => {
    resetGame()
    resultContainer.style.display = "none"
    homeContainer.style.display = "block"
})
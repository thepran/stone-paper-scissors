let playerScore = 0
let computerScore = 0
let gameRound = 0


const gameSelectionChoices = ["rock", "paper", "scissors"]
const userSelectionButtonEl = document.querySelectorAll(".user-selection")
const scoreBoardLightEl = document.querySelectorAll(".led-light")



let computerPlay = () => {
    let randomSelection = gameSelectionChoices[Math.floor(Math.random() * gameSelectionChoices.length)]
    return randomSelection
}

/* ..............Event Listener for user selection........... */
userSelectionButtonEl.forEach(option => {
    option.addEventListener("click", () => {
        let userChoice = option.id
        let computerChoice = computerPlay()
        gameStart(userChoice, computerChoice)

        if (gameRound > 4) {
            for (item in userSelectionButtonEl)
                userSelectionButtonEl[item].disabled = true
        }
    })
})


let gameStart = (userChoice, computerChoice) => {
    let userResult = ''

    if (userChoice === computerChoice) {
        userResult = 'draw'
    }

    else if (userChoice == 'rock')
        if (computerChoice == 'paper') {
            computerScore += 1
            userResult = 'lose'
        }
        else {
            userResult = 'win'
            playerScore += 1
        }

    else if (userChoice == 'paper')
        if (computerChoice == 'rock') {
            userResult = 'win'
            playerScore += 1
        }
        else {
            userResult = 'lose'
            computerScore += 1
        }
    else if (userChoice == 'scissors')

        if (computerChoice == 'rock') {
            userResult = 'lose'
            console.log("lose")
            computerScore += 1
        }
        else {
            userResult = 'win'
            console.log("win")
            playerScore += 1
        }

    /*........... change in LED lights score..... */
    scoreBoardLightEl[gameRound].classList.remove('led-blank')

    if (userResult == 'draw')
        scoreBoardLightEl[gameRound].classList.add('led-yellow')

    else if (userResult == 'win')
        scoreBoardLightEl[gameRound].classList.add('led-green')

    else
        scoreBoardLightEl[gameRound].classList.add('led-red')


    console.log(`gameround= ${gameRound}`)
    gameRound += 1
    console.log(`gameround= ${gameRound}`)
    if (gameRound == 5) {
        console.log(`computer score=${computerScore}, player score= ${playerScore}`)
    }
}
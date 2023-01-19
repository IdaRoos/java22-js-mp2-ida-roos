let textFromInput = 'Anonymous player';
const playerName = document.querySelector('#player');
const gameContainer = document.querySelector('#gameContainer');
const computerText = document.querySelector("#computer");
const resultText = document.querySelector("#resultText");
const choiceBtn = document.querySelectorAll(".choiceBtn");
const computerScoreText = document.querySelector("#scoreComputer");
const playerScoreText = document.querySelector("#scorePlayer");
// Create variables for player and computers choice
let playerChoice;
let computerChoice;
// Create variable for scores
let playerScore = 0;
let computerScore = 0;

// Eventlistener for submit-button
document.querySelector('#buttonName').addEventListener('click', event => {
    event.preventDefault();
    const nameInput = document.querySelector('#inputName');
    // if input is empty when submitting return "Anonymous player" else return the value from the input
    textFromInput = nameInput.value == '' ? 'Anonymous player :' : nameInput.value;
    playerName.innerText = textFromInput + ': ';
    // Replace innerHTMl with empty string when button is clicked to make the input and button disappear
    document.querySelector('form').innerHTML = '';
    resultText.innerText = "Let's play!";
});

// Eventlistener for the 3 game-buttons (ROCK, PAPER, SCISSOR)
choiceBtn.forEach(button => button.addEventListener("click", () => {
    playerChoice = button.value; // Give playerChoice the value ROCK, PAPER or SCISSOR
    // Set textcontent to the text from the input and the players choice (Ex: Playername: ROCK)
    document.querySelector('#player').textContent = `${textFromInput}: ${playerChoice}`;
    // Function(that generates a random number) runs everytime one of the buttons are pressed
    computerChoiceFunc();
    // Set textcontent to Computer: computerChoice(ROCK, PAPER or SCISSOR)
    computerText.textContent = `Computer: ${computerChoice}`;
    // run function and set the textcontent to the string that is returned
    resultText.textContent = checkWinner();

    computerScoreText.textContent = `Computer score: ${computerScore}`;
    playerScoreText.textContent = `Your score: ${playerScore}`;
    // Run function that checks if score is 3
    endGame(playerScore, computerScore);


}));

// Function that gives variable "computer" a value depending on the random number
function computerChoiceFunc() {
    let randomNumb = getRandomNumber();
    switch (randomNumb) {
        case 1:
            computerChoice = "ROCK";
            break;
        case 2:
            computerChoice = "PAPER";
            break;
        case 3:
            computerChoice = "SCISSORS";
            break;
    }
}

// Function that checks computerChoice and playerChoice values
function checkWinner() {
    if (playerChoice == computerChoice) {
        return "It's a tie!";
    }
    else if (computerChoice == "ROCK") {
        if (playerChoice == "PAPER") {
            playerScore++  // playerScore increases with one
            return `You win! Paper beats rock.`;
        } else {
            computerScore++ // computerScore increases with one
            return "You lose... Paper beats rock."

        }
    }
    else if (computerChoice == "PAPER") {
        if (playerChoice == "SCISSORS") {
            playerScore++  // playerScore increases with one
            return "You win! Scissors beats paper."
        } else {
            computerScore++ // computerScore increases with one
            return "You lose... Paper beats rock."
        }

    } else if (computerChoice == "SCISSORS") {
        if (playerChoice == "ROCK") {
            playerScore++  // playerScore increases with one
            return "You win! Rock beats scissors"
        } else {
            computerScore++ // computerScore increases with one
            return "You lose... Scissors beats paper.";
        }
    }

}

// Function that checks if score is 3
function endGame(playerScore, computerScore) {

    // If score is 3 -->
    if (playerScore == 3 || computerScore == 3) {
        // create "play again" button 
        const playAgainBtn = document.createElement('button');
        playAgainBtn.classList.add('playAgain');
        playAgainBtn.innerText = 'Play again';
        // Create variable "winnerText" that checks who's score is higher and return text
        const winnerText = playerScore > computerScore ? "You won this round!"
            : "You lost this round...";
        // Remove buttons inside div element with id gameChoice so the player won't be able to continue the game
        const gameChoice = document.querySelector('#gameChoice')
        gameChoice.remove();
        // Replace resultTexts innertext with variable winnerText.
        resultText.innerText = `${winnerText} `;

        gameContainer.append(playAgainBtn);

        // EventListener that reloads page when "play again"-button is clicked
        playAgainBtn.addEventListener('click', event => {
            location.reload();
        });
    }
}

// Function that returns a random number between 1-3
function getRandomNumber() {
    return Math.ceil(Math.random() * 3)
}
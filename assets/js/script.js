// Initialize game variables
let userScore = 0;
let computerScore = 0;
let maxTries = 10;
let triesLeft = maxTries;
let username = "";

// Get HTML elements
const usernameInput = document.getElementById('username');
const startButton = document.getElementById('start-button');
const userInfoDiv = document.getElementById('user-info');
const gameDiv = document.getElementById('game');
const userLabel = document.getElementById('user-label');
const userNameDisplay = document.getElementById('user-name');
const scoreDisplay = document.getElementById('score');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');

// Hide the game section initially
gameDiv.style.display = 'none';

// Add an event listener for the "Start Game" button
startButton.addEventListener('click', () => {
    // Get the entered username
    username = usernameInput.value;

    if (username) {
        // Hide the user info section and show the game section
        userInfoDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        userLabel.textContent = `${username}:`;
        userNameDisplay.textContent = username;
        scoreDisplay.style.display = 'block';

        // Enable choice buttons
        choices.forEach(choice => {
            choice.disabled = false;
        });
    } else {
        alert('Please enter a username to start the game.');
    }
});

// Get all the choice buttons
const choices = document.querySelectorAll('.choice');

// Add event listeners to the choice buttons
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (triesLeft > 0) {
            const userChoice = choice.getAttribute('data-choice');
            const computerChoice = computerPlay();
            const result = playRound(userChoice, computerChoice);
            updateGame(result, userChoice, computerChoice);
        }
    });
});

// Add a click event listener to the restart button
restartButton.addEventListener('click', () => {
    restartGame();
});

// Function to determine the computer's choice
function computerPlay() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].getAttribute('data-choice');
}

// Function to play a round and determine the result
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && (computerSelection === 'scissors' || computerSelection === 'lizard')) ||
        (playerSelection === 'paper' && (computerSelection === 'rock' || computerSelection === 'spock')) ||
        (playerSelection === 'scissors' && (computerSelection === 'paper' || computerSelection === 'lizard')) ||
        (playerSelection === 'lizard' && (computerSelection === 'spock' || computerSelection === 'paper')) ||
        (playerSelection === 'spock' && (computerSelection === 'rock' || computerSelection === 'scissors'))
    ) {
        userScore++;
        return 'You win this round!';
    } else {
        computerScore++;
        return 'Computer wins this round!';
    }
}

// Function to update the game based on the round result
function updateGame(result, userChoice, computerChoice) {
    triesLeft--;
    scoreDisplay.textContent = `Score: ${username} ${userScore} - Computer ${computerScore}`;
    resultDisplay.textContent = `${result} You chose ${userChoice}, computer chose ${computerChoice}.`;

    if (triesLeft === 0) {
        endGame();
    }
}

// Function to handle the end of the game
function endGame() {
    if (userScore > computerScore) {
        resultDisplay.textContent = `${username} wins the game!`;
    } else if (userScore < computerScore) {
        resultDisplay.textContent = 'Computer wins the game!';
    } else {
        resultDisplay.textContent = "It's a tie!";
    }

    // Disable the choice buttons
    choices.forEach(choice => {
        choice.disabled = true;
    });

    restartButton.style.display = 'block';
}

// Function to restart the game
function restartGame() {
    triesLeft = maxTries;
    userScore = 0;
    computerScore = 0;
    scoreDisplay.textContent = `Score: ${username} 0 - Computer 0`;
    resultDisplay.textContent = '';

    // Enable the choice buttons
    choices.forEach(choice => {
        choice.disabled = false;
    });
    gameDiv.style.display = 'none'; // Hide the game section
    userInfoDiv.style.display = 'block'; // Show the user info section
}
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
const brain = require('brain.js');
const readline = require('readline');

// Initialize the neural network
const net = new brain.NeuralNetwork();

// Define training data
const trainingData = [];
for (let i = 1; i <= 100; i++) {
    trainingData.push({ input: { guess: i / 100 }, output: { target: i / 100 } });
}

// Train the neural network
net.train(trainingData, {
    iterations: 2000, // Increase the number of training iterations
    errorThresh: 0.01, // Set a lower error threshold
    log: true,
    logPeriod: 100
});

// Initialize readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to play the game
function playGame() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("Guess a number between 1 and 100.");
    
    // Generate a random number for the player to guess
    const targetNumber = Math.floor(Math.random() * 100) + 1;

    // Function to handle user input
    rl.question("Your guess: ", (answer) => {
        const playerGuess = parseInt(answer);
        if (playerGuess === targetNumber) {
            console.log("Congratulations! You guessed the correct number.");
            rl.close();
            return;
        } else {
            // Normalize the player's guess between 0 and 1 for the neural network
            const normalizedGuess = playerGuess / 100;
            // Run the neural network to predict the target number
            const output = net.run({ guess: normalizedGuess });
            const predictedNumber = Math.round(output.target * 100);
            console.log(`Sorry, that's not correct. The neural network predicts the number is approximately ${predictedNumber}.`);
            // Ask for another guess
            playGame();
        }
    });
}

// Start the game
playGame();

const brain = require('brain.js');
const mnist = require('mnist'); // Library for loading the MNIST dataset

// Load the MNIST training data
const set = mnist.set(8000, 2000); // 8000 training examples, 2000 testing examples
const trainingData = set.training;

// Create a neural network
const net = new brain.NeuralNetwork({
    hiddenLayers: [784, 392] // Two hidden layers with 784 and 392 neurons respectively
});

// Train the neural network
net.train(trainingData, {
    log: true,
    logPeriod: 1,
    learningRate: 0.05,
    errorThresh: 0.005
});

// Test the trained network
const testingData = set.test;
let correct = 0;
for (let i = 0; i < testingData.length; i++) {
    const output = net.run(testingData[i].input);
    const predictedDigit = output.indexOf(Math.max(...output));
    const actualDigit = testingData[i].output.indexOf(1);
    if (predictedDigit === actualDigit) {
        correct++;
    }
}

console.log(`Accuracy: ${(correct / testingData.length) * 100}%`);

const brain = require('brain.js');


const trainingData = [];
for (let i = 0; i < 360; i++) {
    const radians = i * Math.PI / 180;
    trainingData.push({ input: { x: radians }, output: { sine: Math.sin(radians), cosine: Math.cos(radians) } });
}


const net = new brain.NeuralNetwork();
net.train(trainingData);


const testValueDegrees = 45; 
const testValueRadians = testValueDegrees * Math.PI / 180;

const output = net.run({ x: testValueRadians });

console.log(`Sine of ${testValueDegrees} degrees: ${output.sine}`);
console.log(`Cosine of ${testValueDegrees} degrees: ${output.cosine}`);

// Use `tfjs-node`. Note that `tfjs` is imported indirectly by `tfjs-node`.
const tf = require('@tensorflow/tfjs-node');
const fs  = require("fs");


(async()=>{
  let model;

  if(fs.existsSync("files/model.json")){
    console.log(1)
    model =await tf.loadLayersModel("file://files/model.json");
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    model.save("file://files");
  
  } else{ 
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [1] })); // Input layer with 10 neurons and ReLU activation
    model.add(tf.layers.dense({ units: 1 })); // Output layer
    
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    model.save("file://files" );
  
    


  }
  
  const generateData = (numPoints) => {
    const xs = tf.randomUniform([numPoints], -10, 10); // Generate random values of x between -10 and 10
    const ys = xs.square().add(tf.scalar(1)); // Calculate y = x^2 + 1
    return { xs, ys };
  };
  const { xs, ys } = generateData(100);


  
  // Train the model.
  model.fit(xs, ys, {
    epochs: 10,
    callbacks: {
      onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
    }
  }).then(() => {
    // Evaluate the model
    const xTest = tf.tensor2d([[5], [10], [15]]); // Test values of x
    const yPred = model.predict(xTest); // Predict corresponding values of y
    yPred.print();
  });;
})()

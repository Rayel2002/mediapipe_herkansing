import brain from 'brain.js';

let model;

export const trainModel = async (poseData) => {
  const net = new brain.NeuralNetwork();

  const trainingData = poseData.map(data => ({
    input: data.inputs.flat(),
    output: { [data.label]: 1 }
  }));

  net.train(trainingData, {
    iterations: 2000,
    log: true,
    logPeriod: 100,
    learningRate: 0.5
  });

  model = net;
  return model;
};

export const getModel = () => {
  if (!model) {
    throw new Error('Model has not been trained.');
  }
  return model;
};

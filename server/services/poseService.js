import { savePoseData as savePoseDataToDb, getPoseData as getPoseDataFromDb } from '../models/poseModel.js';
import brain from 'brain.js';

let model;

export const savePoseData = async (poseData) => {
  try {
    console.log('Saving pose data:', poseData);
    await savePoseDataToDb(poseData);
  } catch (error) {
    console.error('Error in savePoseData service:', error.message);
    throw new Error('Error saving pose data: ' + error.message);
  }
};

export const getPoseData = async () => {
  try {
    return await getPoseDataFromDb();
  } catch (error) {
    console.error('Error in getPoseData service:', error.message);
    throw new Error('Error getting pose data: ' + error.message);
  }
};

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

export const predictPose = async (pose) => {
  if (!model) {
    throw new Error('Model has not been trained.');
  }
  const result = model.run(pose.flat());
  return Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
};

export const calculateAccuracy = async (poseData) => {
  if (!model) {
    throw new Error('Model has not been trained.');
  }

  let correctPredictions = 0;
  poseData.forEach(data => {
    const prediction = predictPose(data.inputs);
    if (prediction === data.label) {
      correctPredictions++;
    }
  });

  return correctPredictions / poseData.length;
};

export const getConfusionMatrix = async (poseData) => {
  if (!model) {
    throw new Error('Model has not been trained.');
  }

  const labels = [...new Set(poseData.map(data => data.label))];
  const matrix = Array(labels.length).fill(null).map(() => Array(labels.length).fill(0));

  const labelIndex = label => labels.indexOf(label);

  poseData.forEach(data => {
    const actual = labelIndex(data.label);
    const predicted = labelIndex(predictPose(data.inputs));
    matrix[actual][predicted]++;
  });

  return matrix;
};

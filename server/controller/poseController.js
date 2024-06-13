import { savePoseData, getPoseData, trainModel, predictPose, calculateAccuracy, getConfusionMatrix } from '../services/poseService.js';

export const savePoseDataHandler = async (req, res) => {
  try {
    console.log('Received pose data:', req.body);
    await savePoseData(req.body);
    res.status(201).send('Pose data saved');
  } catch (error) {
    console.error('Error in savePoseDataHandler:', error.message);
    res.status(500).send(error.message);
  }
};

export const getPoseDataHandler = async (req, res) => {
  try {
    const data = await getPoseData();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getPoseDataHandler:', error.message);
    res.status(500).send(error.message);
  }
};

export const trainModelHandler = async (req, res) => {
  try {
    const model = await trainModel(req.body);
    res.status(200).send('Model trained');
  } catch (error) {
    console.error('Error in trainModelHandler:', error.message);
    res.status(500).send(error.message);
  }
};

export const predictPoseHandler = async (req, res) => {
  try {
    const prediction = await predictPose(req.body);
    res.status(200).json({ prediction });
  } catch (error) {
    console.error('Error in predictPoseHandler:', error.message);
    res.status(500).send(error.message);
  }
};

export const calculateAccuracyHandler = async (req, res) => {
  try {
    const accuracy = await calculateAccuracy(req.body);
    res.status(200).json({ accuracy });
  } catch (error) {
    console.error('Error in calculateAccuracyHandler:', error.message);
    res.status(500).send(error.message);
  }
};

export const getConfusionMatrixHandler = async (req, res) => {
  try {
    const matrix = await getConfusionMatrix(req.body);
    res.status(200).json({ matrix });
  } catch (error) {
    console.error('Error in getConfusionMatrixHandler:', error.message);
    res.status(500).send(error.message);
  }
};

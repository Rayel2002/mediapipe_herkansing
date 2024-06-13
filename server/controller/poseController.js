import { savePoseData, getPoseData, trainModel, predictPose, calculateAccuracy, getConfusionMatrix } from '../services/poseService.js';

export const savePoseDataHandler = async (req, res) => {
  try {
    await savePoseData(req.body);
    res.status(201).send('Pose data saved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getPoseDataHandler = async (req, res) => {
  try {
    const data = await getPoseData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const trainModelHandler = async (req, res) => {
  try {
    const model = await trainModel(req.body);
    res.status(200).send('Model trained');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const predictPoseHandler = async (req, res) => {
  try {
    const prediction = await predictPose(req.body);
    res.status(200).json({ prediction });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const calculateAccuracyHandler = async (req, res) => {
  try {
    const accuracy = await calculateAccuracy();
    res.status(200).json({ accuracy });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getConfusionMatrixHandler = async (req, res) => {
  try {
    const matrix = await getConfusionMatrix();
    res.status(200).json({ matrix });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

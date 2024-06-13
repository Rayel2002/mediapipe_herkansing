import { predictPose } from './predictPose.js';

export const calculateAccuracy = (poseData) => {
  const model = getModel();
  let correctPredictions = 0;
  poseData.forEach(data => {
    const prediction = predictPose(data.inputs);
    if (prediction === data.label) {
      correctPredictions++;
    }
  });

  return correctPredictions / poseData.length;
};

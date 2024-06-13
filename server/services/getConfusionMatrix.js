import { predictPose } from './predictPose.js';

export const getConfusionMatrix = (poseData) => {
  const model = getModel();
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

import { getModel } from './trainModel.js';

export const predictPose = (pose) => {
  const model = getModel();
  const result = model.run(pose.flat());
  return Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
};

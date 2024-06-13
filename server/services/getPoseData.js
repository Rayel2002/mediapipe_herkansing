import { getPoseData as getPoseDataFromDb } from '../models/poseModel.js';

export const getPoseData = async () => {
  try {
    const data = await getPoseDataFromDb();
    return data;
  } catch (error) {
    console.error('Error getting pose data:', error.message);
    throw new Error('Error getting pose data: ' + error.message);
  }
};


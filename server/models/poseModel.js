// models/poseModel.js
import mongoose, { Schema } from "mongoose";

const poseSchema = new Schema({
  name: String,
  inputs: [[Number]],  // Zorg ervoor dat dit overeenkomt met je data-structuur
  label: String,
});

const Pose = mongoose.model('Pose', poseSchema);

export const savePoseData = async (poseData) => {
  try {
    console.log('Attempting to save pose data...');
    await Pose.insertMany(poseData);
    console.log('Pose data saved successfully');
  } catch (error) {
    console.error('Error saving pose data:', error);
    throw new Error('Error saving pose data: ' + error.message);
  }
};

export const getPoseData = async () => {
  try {
    console.log('Fetching pose data...');
    return await Pose.find().exec();
  } catch (error) {
    console.error('Error getting pose data:', error.message);
    throw new Error('Error getting pose data: ' + error.message);
  }
};

export default mongoose;

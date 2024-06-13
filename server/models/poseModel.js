import 'dotenv/config';
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the database");
});

const poseSchema = new Schema({
  name: String,
  coordinates: [Number],
});

const Pose = mongoose.model('Pose', poseSchema);

export const savePoseData = async (poseData) => {
  try {
    await Pose.insertMany(poseData);
    console.log('Pose data saved successfully');
  } catch (error) {
    console.error('Error saving pose data:', error);
  }
};

export const getPoseData = async () => {
  try {
    return await Pose.find().exec();
  } catch (error) {
    console.error('Error getting pose data:', error);
  }
};


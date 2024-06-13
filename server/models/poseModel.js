import mongoose, { Schema } from 'mongoose';
import 'dotenv/config'; // Zorg ervoor dat dotenv wordt geïmporteerd om de omgevingsvariabelen te laden

const mongoUrl = process.env.MONGO_URL; // Haal de MongoDB URL op uit de omgevingsvariabelen

mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});

const poseSchema = new Schema({
  inputs: [[Number]], // Zorg ervoor dat inputs een array van arrays van nummers is
  label: String,
});

const Pose = mongoose.model('Pose', poseSchema);

export const savePoseData = async (poseData) => {
  try {
    // Converteer poseData naar het juiste formaat
    const formattedData = poseData.map(data => ({
      ...data,
      inputs: data.inputs.map(point => [point.x, point.y]) // Converteer objecten naar arrays van nummers
    }));

    await Pose.insertMany(formattedData);
    console.log('Pose data saved successfully');
  } catch (error) {
    console.error('Error saving pose data:', error);
    throw error;
  }
};

export const getPoseData = async () => {
  try {
    const data = await Pose.find();
    console.log('Received pose data:', data);
    return data;
  } catch (error) {
    console.error('Error retrieving pose data:', error);
    throw error;
  }
};

export default Pose;

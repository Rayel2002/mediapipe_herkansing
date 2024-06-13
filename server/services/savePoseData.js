import { savePoseData as savePoseDataToDb } from '../models/poseModel.js';

export const savePoseData = async (poseData) => {
  try {
    const transformedData = poseData.map(data => ({
      inputs: data.inputs.map(coord => [coord.x, coord.y]), // Zet objecten om naar arrays
      label: data.label,
    }));
    
    console.log('Saving pose data:', JSON.stringify(transformedData, null, 2)); // Verbeterde logging
    
    // Voeg een klein stukje gegevens in om te testen
    if (transformedData.length > 10) {
      transformedData = transformedData.slice(0, 10);
    }
    
    await savePoseDataToDb(transformedData);
    console.log('Pose data saved successfully');
  } catch (error) {
    console.error('Error in savePoseData service:', error.message);
    throw new Error('Error saving pose data: ' + error.message);
  }
};

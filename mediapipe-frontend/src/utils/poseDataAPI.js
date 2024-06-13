const API_URL = 'http://localhost:8050/poseData'; // Correcte URL voor je API endpoint

export const savePoseData = async (poseData) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poseData),
    });
    if (!response.ok) {
      throw new Error('Error saving pose data');
    }
  } catch (error) {
    console.error('Error saving pose data:', error);
    throw error;
  }
};

export const getPoseData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error getting pose data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting pose data:', error);
    throw error;
  }
};


import axios from 'axios';

interface LatLng {
  lat: number;
  lng: number;
}

const getLatLngFromAddress = async (address: string): Promise<LatLng> => {
  const apiKey = process.env.GEOCODING; // Replace with your OpenCage API key
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error converting address to lat lng:', error);
    throw error;
  }
};

export default getLatLngFromAddress;

import axios from 'axios';

export const geocodeAddress = async (address) => {
  const apiKey = process.env.LOCATIONIQ_API_KEY;
  const encodedAddress = encodeURIComponent(address);
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodedAddress}&format=json`;

  const response = await axios.get(url);

  if (!response.data || response.data.length === 0) {
    throw new Error("No location found from LocationIQ.");
  }

  const location = response.data[0];

  return {
    latitude: parseFloat(location.lat),
    longitude: parseFloat(location.lon),
  };
};

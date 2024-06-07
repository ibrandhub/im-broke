import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const rankingList = async () => {
  try {
    const result = await axios.get(`${API_URL}ranking`);

    if (result.status == 200) {
      return result.data;
    }
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

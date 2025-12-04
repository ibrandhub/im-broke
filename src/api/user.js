import axios from 'axios';
// Connect to MongoDB
// connectDB();

const API_URL = import.meta.env.VITE_API_URL;

// user update name and password
export const updateProfile = async ({ userId, name, password }) => {
  try {
    const result = await axios.put(`${API_URL}user/update/${userId}`, {
      name,
      password
    });
    if (result.status == 200) {
      return result.data;
    }
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

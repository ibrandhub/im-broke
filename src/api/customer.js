import axios from 'axios';
// Connect to MongoDB
// connectDB();

const API_URL = 'https://www.melivecode.com/api';

export const customerList = async ({ page, per_page }) => {
  const result = await axios.get(`${API_URL}/users/?page=${page}&per_page=${per_page}`);

  if (result.status == 200) {
    return result.data;
  } else {
    return null;
  }
};

// export const customerList = async ({ page, per_page }) => {
//   const result = await axios.get(`${API_URL}/users/?page=${page}&per_page=${per_page}`);

//   if (result.status == 200) {
//     return result.data;
//   } else {
//     return null;
//   }
// };

export const filterCustomer = async (search) => {
  const result = await axios.get(`${API_URL}/users/?search=${search}`);
  if (result.status == 200) {
    return result.data;
  } else {
    return null;
  }
};

// try {
//   const response = await axios.post('/api/transfer', {
//     senderId: user._id,
//     receiverId,
//     amount: coin
//   });

//   console.log('Transfer response:', response.data);
//   handleClose();
// } catch (error) {
//   console.error('Error transferring coins:', error.response.data);
// }

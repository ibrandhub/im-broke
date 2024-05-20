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

import axios from 'axios';

const API_URL = 'https://www.melivecode.com/api';

export const login = async (values) => {
  const result = await axios.post(`${API_URL}/login`, {
    values
  });

  console.log('result', result);

  if (result.status == 'ok') {
    return result.data;
  } else {
    return null;
  }
};

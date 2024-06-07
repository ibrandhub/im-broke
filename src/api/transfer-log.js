import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const transferLogList = async ({ userId, page, per_page }) => {
  try {
    const result = await axios.get(`${API_URL}transfer/logs/user/${userId}?page=${page}&per_page=${per_page}`);
    if (result.status == 200) {
      return result.data;
    }
  } catch (err) {
    return err.response.data;
  }
};

export const readTransferLog = async (logId) => {
  try {
    const result = await axios.patch(`${API_URL}transfer/logs/${logId}/read`);
    if (result.status == 200) {
      return result;
    }
  } catch (err) {
    return err.response.data;
  }
};

export const readTransferLogAll = async (userId) => {
  try {
    const result = await axios.patch(`${API_URL}transfer/logs/user/${userId}/read-all`);
    if (result.status == 200) {
      return result;
    }
  } catch (err) {
    return err.response.data;
  }
};

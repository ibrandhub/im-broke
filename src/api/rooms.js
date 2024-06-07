import axios from 'axios';
// Connect to MongoDB
// connectDB();

const API_URL = import.meta.env.VITE_API_URL;

export const roomList = async ({ page, per_page }) => {
  const result = await axios.get(`${API_URL}room/?page=${page}&per_page=${per_page}`);

  if (result.status == 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getRoom = async (id) => {
  try {
    const result = await axios.get(`${API_URL}room/${id}`);
    if (result.status == 200) {
      return result.data;
    }
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

export const userJoinRoom = async (data) => {
  const result = await axios.post(`${API_URL}room/user/join`, data);

  if (result.status == 200) {
    return result.data;
  } else {
    return null;
  }
};

export const createRoom = async (data) => {
  const result = await axios.post(`${API_URL}createroom`, data);
  if (result.status == 200) {
    return result;
  } else {
    return null;
  }
};

export const transferCoin = async ({ senderId, receiverId, amount, roomId }) => {
  const result = await axios.post(`${API_URL}transfer`, {
    senderId,
    receiverId,
    amount,
    roomId
  });

  if (result.status == 200) {
    return result;
  } else {
    return null;
  }
};

export const leaveRoom = async ({ roomId, userId }) => {
  const result = await axios.post(`${API_URL}room/user/leave`, {
    roomId,
    userId
  });

  if (result.status == 200) {
    return result;
  } else {
    return null;
  }
};

export const closeRoom = async ({ roomId, ownerId }) => {
  const result = await axios.delete(`${API_URL}room/close`, {
    data: {
      roomId,
      ownerId
    }
  });

  if (result.status == 200) {
    return result;
  } else {
    return null;
  }
};

export const summaryRoom = async ({ roomId, userId }) => {
  try {
    const result = await axios.post(`${API_URL}room/summary`, {
      roomId,
      userId
    });

    if (result.status == 200) {
      return result;
    }
  } catch (err) {
    return err;
  }
};

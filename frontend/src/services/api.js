// frontend/src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/backend'; // adjust your backend URL

export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/admin/users`);
  return response.data;
};

export const getAIStatus = async (userId) => {
  const response = await axios.get(`${BASE_URL}/admin/ai-status/${userId}`);
  return response.data;
};

export const overrideAIWallet = async (userId, amount) => {
  return axios.post(`${BASE_URL}/admin/override-ai`, { userId, newAmount: amount });
};

export const setDailyTradeLimit = async (limit) => {
  return axios.post(`${BASE_URL}/admin/set-daily-trade-limit`, { limit });
};

export const executeManualTrade = async (userId, percentage, mode) => {
  return axios.post(`${BASE_URL}/admin/manual-trade`, { userId, selectedPercentage: percentage, mode });
};
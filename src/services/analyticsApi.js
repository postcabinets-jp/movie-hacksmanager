import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const analyticsApi = {
  getAnalytics: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics`);
      return response.data;
    } catch (error) {
      console.error('分析データの取得に失敗しました:', error);
      throw error;
    }
  },

  getUserAnalytics: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('ユーザー分析データの取得に失敗しました:', error);
      throw error;
    }
  },

  getVideoAnalytics: async (videoId) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('動画分析データの取得に失敗しました:', error);
      throw error;
    }
  },

  getAnalyticsByDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/by-date`, {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error('期間別分析データの取得に失敗しました:', error);
      throw error;
    }
  },
};

export default analyticsApi; 
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const analyticsService = {
  // 概要データの取得
  getOverview: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/overview`);
      return response.data;
    } catch (error) {
      console.error('概要データの取得に失敗しました:', error);
      throw error;
    }
  },

  // 視聴傾向の取得
  getViewingTrends: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/trends`);
      return response.data;
    } catch (error) {
      console.error('視聴傾向の取得に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリ分布の取得
  getCategoryDistribution: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/categories`);
      return response.data;
    } catch (error) {
      console.error('カテゴリ分布の取得に失敗しました:', error);
      throw error;
    }
  },

  // 人気動画の取得
  getPopularVideos: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/popular`);
      return response.data;
    } catch (error) {
      console.error('人気動画の取得に失敗しました:', error);
      throw error;
    }
  },

  // ユーザー活動の取得
  getUserActivity: async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics/activity`);
      return response.data;
    } catch (error) {
      console.error('ユーザー活動の取得に失敗しました:', error);
      throw error;
    }
  },

  // 期間指定での分析データ取得
  getAnalyticsByDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/range`, {
        params: {
          startDate,
          endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('期間指定での分析データ取得に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーごとの分析データ取得
  getUserAnalytics: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('ユーザーごとの分析データ取得に失敗しました:', error);
      throw error;
    }
  },

  // 動画ごとの分析データ取得
  getVideoAnalytics: async (videoId) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error('動画ごとの分析データ取得に失敗しました:', error);
      throw error;
    }
  },
};

export default analyticsService; 
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const tagApi = {
  // タグ一覧の取得
  getTags: async () => {
    try {
      const response = await axios.get(`${API_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('タグ一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // タグの作成
  createTag: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/tags`, data);
      return response.data;
    } catch (error) {
      console.error('タグの作成に失敗しました:', error);
      throw error;
    }
  },

  // タグの更新
  updateTag: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/tags/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('タグの更新に失敗しました:', error);
      throw error;
    }
  },

  // タグの削除
  deleteTag: async (id) => {
    try {
      await axios.delete(`${API_URL}/tags/${id}`);
    } catch (error) {
      console.error('タグの削除に失敗しました:', error);
      throw error;
    }
  },

  // タグの詳細取得
  getTag: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error('タグの取得に失敗しました:', error);
      throw error;
    }
  },

  // タグの統計情報取得
  getTagStats: async (tagId) => {
    try {
      const response = await axios.get(`${API_URL}/tags/${tagId}/stats`);
      return response.data;
    } catch (error) {
      console.error('タグの統計情報取得に失敗しました:', error);
      throw error;
    }
  },

  // タグの使用回数更新
  updateTagUsage: async (tagId) => {
    try {
      const response = await axios.put(`${API_URL}/tags/${tagId}/usage`);
      return response.data;
    } catch (error) {
      console.error('タグの使用回数更新に失敗しました:', error);
      throw error;
    }
  },

  // タグの検索
  searchTags: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/tags/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('タグの検索に失敗しました:', error);
      throw error;
    }
  },
};

export default tagApi; 
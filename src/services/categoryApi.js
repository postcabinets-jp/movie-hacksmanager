import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const categoryApi = {
  // カテゴリー一覧の取得
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('カテゴリー一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの作成
  createCategory: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, data);
      return response.data;
    } catch (error) {
      console.error('カテゴリーの作成に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの更新
  updateCategory: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('カテゴリーの更新に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの削除
  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
    } catch (error) {
      console.error('カテゴリーの削除に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの並び替え
  reorderCategories: async (categoryIds) => {
    try {
      const response = await axios.put(`${API_URL}/categories/reorder`, { categoryIds });
      return response.data;
    } catch (error) {
      console.error('カテゴリーの並び替えに失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの詳細取得
  getCategory: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('カテゴリーの取得に失敗しました:', error);
      throw error;
    }
  },

  // カテゴリーの統計情報取得
  getCategoryStats: async (categoryId) => {
    try {
      const response = await axios.get(`${API_URL}/categories/${categoryId}/stats`);
      return response.data;
    } catch (error) {
      console.error('カテゴリーの統計情報取得に失敗しました:', error);
      throw error;
    }
  },
};

export default categoryApi; 
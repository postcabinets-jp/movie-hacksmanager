import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const systemLogApi = {
  getLogs: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/system-logs`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('ログの取得に失敗しました:', error);
      throw error;
    }
  },

  getLog: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/system-logs/${id}`);
      return response.data;
    } catch (error) {
      console.error('ログの詳細取得に失敗しました:', error);
      throw error;
    }
  },

  deleteLog: async (id) => {
    try {
      await axios.delete(`${API_URL}/system-logs/${id}`);
    } catch (error) {
      console.error('ログの削除に失敗しました:', error);
      throw error;
    }
  },

  deleteLogs: async (ids) => {
    try {
      await axios.post(`${API_URL}/system-logs/delete-multiple`, { ids });
    } catch (error) {
      console.error('ログの一括削除に失敗しました:', error);
      throw error;
    }
  },

  exportLogs: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/system-logs/export`, {
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('ログのエクスポートに失敗しました:', error);
      throw error;
    }
  },

  getLogStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/system-logs/stats`);
      return response.data;
    } catch (error) {
      console.error('ログ統計の取得に失敗しました:', error);
      throw error;
    }
  },

  getLogLevels: async () => {
    try {
      const response = await axios.get(`${API_URL}/system-logs/levels`);
      return response.data;
    } catch (error) {
      console.error('ログレベルの取得に失敗しました:', error);
      throw error;
    }
  },

  getLogTypes: async () => {
    try {
      const response = await axios.get(`${API_URL}/system-logs/types`);
      return response.data;
    } catch (error) {
      console.error('ログタイプの取得に失敗しました:', error);
      throw error;
    }
  },

  clearLogs: async (filters = {}) => {
    try {
      await axios.post(`${API_URL}/system-logs/clear`, filters);
    } catch (error) {
      console.error('ログのクリアに失敗しました:', error);
      throw error;
    }
  },
};

export default systemLogApi; 
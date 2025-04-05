import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const viewingRecordApi = {
  getRecords: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('視聴記録の取得に失敗しました:', error);
      throw error;
    }
  },

  getRecord: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records/${id}`);
      return response.data;
    } catch (error) {
      console.error('視聴記録の取得に失敗しました:', error);
      throw error;
    }
  },

  getUserRecords: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error('ユーザーの視聴記録の取得に失敗しました:', error);
      throw error;
    }
  },

  getVideoRecords: async (videoId) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records`, {
        params: { videoId },
      });
      return response.data;
    } catch (error) {
      console.error('動画の視聴記録の取得に失敗しました:', error);
      throw error;
    }
  },

  exportRecords: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records/export`, {
        params: filters,
        responseType: 'blob',
      });
      
      // CSVファイルとしてダウンロード
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `viewing-records-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return response.data;
    } catch (error) {
      console.error('視聴記録のエクスポートに失敗しました:', error);
      throw error;
    }
  },

  getRecordStats: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/viewing-records/stats`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('視聴記録の統計情報の取得に失敗しました:', error);
      throw error;
    }
  },
};

export default viewingRecordApi; 
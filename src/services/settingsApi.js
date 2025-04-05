import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const settingsApi = {
  // 設定の取得
  getSettings: async () => {
    try {
      const response = await axios.get(`${API_URL}/settings`);
      return response.data;
    } catch (error) {
      console.error('設定の取得に失敗しました:', error);
      throw error;
    }
  },

  // 設定の更新
  updateSettings: async (settings) => {
    try {
      const response = await axios.put(`${API_URL}/settings`, settings);
      return response.data;
    } catch (error) {
      console.error('設定の更新に失敗しました:', error);
      throw error;
    }
  },

  // バックアップの作成
  createBackup: async () => {
    try {
      const response = await axios.post(`${API_URL}/settings/backup`);
      return response.data;
    } catch (error) {
      console.error('バックアップの作成に失敗しました:', error);
      throw error;
    }
  },

  // バックアップのリストア
  restoreBackup: async (backupId) => {
    try {
      const response = await axios.post(`${API_URL}/settings/restore/${backupId}`);
      return response.data;
    } catch (error) {
      console.error('バックアップのリストアに失敗しました:', error);
      throw error;
    }
  },

  // バックアップの削除
  deleteBackup: async (backupId) => {
    try {
      await axios.delete(`${API_URL}/settings/backup/${backupId}`);
    } catch (error) {
      console.error('バックアップの削除に失敗しました:', error);
      throw error;
    }
  },

  // バックアップ一覧の取得
  getBackups: async () => {
    try {
      const response = await axios.get(`${API_URL}/settings/backups`);
      return response.data;
    } catch (error) {
      console.error('バックアップ一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // システム情報の取得
  getSystemInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/settings/system-info`);
      return response.data;
    } catch (error) {
      console.error('システム情報の取得に失敗しました:', error);
      throw error;
    }
  },

  // ログの取得
  getLogs: async (type = 'system', limit = 100) => {
    try {
      const response = await axios.get(`${API_URL}/settings/logs`, {
        params: { type, limit },
      });
      return response.data;
    } catch (error) {
      console.error('ログの取得に失敗しました:', error);
      throw error;
    }
  },
};

export default settingsApi; 
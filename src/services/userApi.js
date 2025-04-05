import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const userApi = {
  // ユーザー一覧の取得
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('ユーザー一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーの詳細取得
  getUser: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('ユーザーの取得に失敗しました:', error);
      throw error;
    }
  },

  // 新規ユーザーの作成
  createUser: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/users`, data);
      return response.data;
    } catch (error) {
      console.error('ユーザーの作成に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーの更新
  updateUser: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('ユーザーの更新に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーの削除
  deleteUser: async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
      console.error('ユーザーの削除に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーの状態変更
  updateUserStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('ユーザーステータスの更新に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーの権限変更
  updateUserRole: async (id, role) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${id}/role`, {
        role,
      });
      return response.data;
    } catch (error) {
      console.error('ユーザーロールの更新に失敗しました:', error);
      throw error;
    }
  },

  // ユーザーのパスワードリセット
  resetPassword: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/users/${id}/reset-password`);
      return response.data;
    } catch (error) {
      console.error('パスワードのリセットに失敗しました:', error);
      throw error;
    }
  },
};

export default userApi; 
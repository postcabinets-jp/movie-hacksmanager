import axios from 'axios';
import apiService from './apiService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const authService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// モック管理者データ
const mockAdmin = {
  id: '1',
  name: '管理者',
  email: 'admin@example.com',
  role: 'admin',
};

export const authApi = {
  // ログイン
  login: async (credentials) => {
    try {
      const response = await authService.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  },
  
  // ログアウト
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  },
  
  // 現在のユーザー情報を取得
  getCurrentUser: () => {
    const username = localStorage.getItem('username');
    return username || null;
  },
  
  // 認証状態をチェック
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // トークンを取得
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // パスワードリセットリクエスト
  requestPasswordReset: async (email) => {
    try {
      await apiService.post('/auth/reset-password-request', { email });
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // パスワードリセット
  resetPassword: async (token, newPassword) => {
    try {
      await apiService.post('/auth/reset-password', { token, newPassword });
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // パスワード変更
  changePassword: async (currentPassword, newPassword) => {
    try {
      await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default authService; 
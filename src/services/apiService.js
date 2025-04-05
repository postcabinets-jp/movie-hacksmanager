import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラーの場合、ログアウト処理
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 動画関連のAPI
export const videoApi = {
  // 動画一覧の取得
  getVideos: () => apiService.get('/videos'),
  
  // 動画の詳細取得
  getVideo: (id) => apiService.get(`/videos/${id}`),
  
  // 動画のアップロード
  uploadVideo: (formData) => apiService.post('/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // 動画の更新
  updateVideo: (id, data) => apiService.put(`/videos/${id}`, data),
  
  // 動画の削除
  deleteVideo: (id) => apiService.delete(`/videos/${id}`),
};

// ユーザー関連のAPI
export const userApi = {
  // ユーザー一覧の取得
  getUsers: () => apiService.get('/users'),
  
  // ユーザーの詳細取得
  getUser: (id) => apiService.get(`/users/${id}`),
  
  // ユーザーの作成
  createUser: (data) => apiService.post('/users', data),
  
  // ユーザーの更新
  updateUser: (id, data) => apiService.put(`/users/${id}`, data),
  
  // ユーザーの削除
  deleteUser: (id) => apiService.delete(`/users/${id}`),
};

// 統計関連のAPI
export const analyticsApi = {
  // 視聴統計の取得
  getViewingStats: (params) => apiService.get('/analytics/viewing-stats', { params }),
  
  // ユーザー別の視聴統計
  getUserStats: (userId) => apiService.get(`/analytics/user-stats/${userId}`),
  
  // 動画別の視聴統計
  getVideoStats: (videoId) => apiService.get(`/analytics/video-stats/${videoId}`),
};

export default apiService; 
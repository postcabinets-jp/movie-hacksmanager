import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const videoApi = {
  // 動画一覧の取得
  getVideos: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/videos`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('動画一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // 動画の詳細取得
  getVideo: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error('動画の取得に失敗しました:', error);
      throw error;
    }
  },

  // 新規動画の作成
  createVideo: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/videos`, data);
      return response.data;
    } catch (error) {
      console.error('動画の作成に失敗しました:', error);
      throw error;
    }
  },

  // 動画の更新
  updateVideo: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/videos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('動画の更新に失敗しました:', error);
      throw error;
    }
  },

  // 動画の削除
  deleteVideo: async (id) => {
    try {
      await axios.delete(`${API_URL}/videos/${id}`);
    } catch (error) {
      console.error('動画の削除に失敗しました:', error);
      throw error;
    }
  },

  // 動画のサムネイル更新
  updateThumbnail: async (id, thumbnailFile) => {
    try {
      const formData = new FormData();
      formData.append('thumbnail', thumbnailFile);

      const response = await axios.put(
        `${API_URL}/videos/${id}/thumbnail`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('サムネイルの更新に失敗しました:', error);
      throw error;
    }
  },

  // 動画の公開状態の変更
  toggleVisibility: async (id, isPublic) => {
    try {
      const response = await axios.patch(`${API_URL}/videos/${id}/visibility`, {
        isPublic,
      });
      return response.data;
    } catch (error) {
      console.error('公開状態の変更に失敗しました:', error);
      throw error;
    }
  },

  uploadVideo: async (file, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await axios.post(`${API_URL}/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      console.error('動画のアップロードに失敗しました:', error);
      throw error;
    }
  },
};

export default videoApi; 
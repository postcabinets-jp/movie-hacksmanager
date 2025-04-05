import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const emailTemplateApi = {
  // テンプレート一覧の取得
  getTemplates: async () => {
    try {
      const response = await axios.get(`${API_URL}/email-templates`);
      return response.data;
    } catch (error) {
      console.error('メールテンプレート一覧の取得に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートの作成
  createTemplate: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/email-templates`, data);
      return response.data;
    } catch (error) {
      console.error('メールテンプレートの作成に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートの更新
  updateTemplate: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/email-templates/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('メールテンプレートの更新に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートの削除
  deleteTemplate: async (id) => {
    try {
      await axios.delete(`${API_URL}/email-templates/${id}`);
    } catch (error) {
      console.error('メールテンプレートの削除に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートの詳細取得
  getTemplate: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/email-templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('メールテンプレートの取得に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートのプレビュー
  previewTemplate: async (id, variables) => {
    try {
      const response = await axios.post(
        `${API_URL}/email-templates/${id}/preview`,
        variables
      );
      return response.data;
    } catch (error) {
      console.error('メールテンプレートのプレビューに失敗しました:', error);
      throw error;
    }
  },

  // テンプレートのテスト送信
  sendTestEmail: async (id, email, variables) => {
    try {
      const response = await axios.post(
        `${API_URL}/email-templates/${id}/send-test`,
        { email, variables }
      );
      return response.data;
    } catch (error) {
      console.error('テストメールの送信に失敗しました:', error);
      throw error;
    }
  },

  // 利用可能な変数の取得
  getAvailableVariables: async (templateType) => {
    try {
      const response = await axios.get(`${API_URL}/email-templates/variables`, {
        params: { type: templateType },
      });
      return response.data;
    } catch (error) {
      console.error('利用可能な変数の取得に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートの複製
  duplicateTemplate: async (templateId) => {
    try {
      const response = await axios.post(`${API_URL}/email-templates/${templateId}/duplicate`);
      return response.data;
    } catch (error) {
      console.error('テンプレートの複製に失敗しました:', error);
      throw error;
    }
  },

  // テンプレートのインポート
  importTemplates: async (templates) => {
    try {
      const response = await axios.post(`${API_URL}/email-templates/import`, {
        templates,
      });
      return response.data;
    } catch (error) {
      console.error('テンプレートのインポートに失敗しました:', error);
      throw error;
    }
  },

  // テンプレートのエクスポート
  exportTemplates: async () => {
    try {
      const response = await axios.get(`${API_URL}/email-templates/export`);
      return response.data;
    } catch (error) {
      console.error('テンプレートのエクスポートに失敗しました:', error);
      throw error;
    }
  },
};

export default emailTemplateApi;

 
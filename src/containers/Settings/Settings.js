import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { settingsApi } from '../../services';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    maintenanceMode: false,
    allowRegistration: true,
    maxVideoSize: 500,
    allowedVideoTypes: [],
    emailNotifications: true,
    storagePath: '/videos',
    backupPath: '/backups',
    retentionDays: 30,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.getSettings();
      const formattedSettings = {
        ...settings,
        ...response,
        allowedVideoTypes: response.videoSettings?.allowedFormats || [],
        maxVideoSize: response.videoSettings?.maxSize || 500,
        storagePath: response.videoSettings?.savePath || '/videos',
        allowRegistration: response.allowUserRegistration || false,
      };
      setSettings(formattedSettings);
    } catch (error) {
      console.error('設定の取得に失敗しました:', error);
      setError('設定の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsApi.updateSettings(settings);
      setSuccess(true);
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
      setError('設定の保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        システム設定
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* 基本設定 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                基本設定
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="サイト名"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="サイト説明"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.maintenanceMode}
                        onChange={handleInputChange}
                        name="maintenanceMode"
                      />
                    }
                    label="メンテナンスモード"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowRegistration}
                        onChange={handleInputChange}
                        name="allowRegistration"
                      />
                    }
                    label="新規ユーザー登録を許可"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 動画設定 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                動画設定
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="最大動画サイズ (MB)"
                    name="maxVideoSize"
                    type="number"
                    value={settings.maxVideoSize}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="許可する動画形式"
                    name="allowedVideoTypes"
                    value={settings.allowedVideoTypes.join(', ')}
                    onChange={(e) => {
                      const types = e.target.value.split(',').map((type) => type.trim());
                      setSettings((prev) => ({ ...prev, allowedVideoTypes: types }));
                    }}
                    helperText="カンマ区切りで入力してください"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="動画保存パス"
                    name="storagePath"
                    value={settings.storagePath}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* バックアップ設定 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                バックアップ設定
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="バックアップ保存パス"
                    name="backupPath"
                    value={settings.backupPath}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="バックアップ保持期間 (日)"
                    name="retentionDays"
                    type="number"
                    value={settings.retentionDays}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 通知設定 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                通知設定
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleInputChange}
                    name="emailNotifications"
                  />
                }
                label="メール通知を有効にする"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '保存中...' : '設定を保存'}
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          設定を保存しました
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { authService } from '../../services/authService';

const MyPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setEditedUser(currentUser);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // ユーザー情報の更新処理を実装
      setIsEditing(false);
    } catch (error) {
      console.error('更新エラー:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              src={user?.avatarUrl}
            />
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="名前"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="メールアドレス"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    保存
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {user?.email}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                >
                  プロフィールを編集
                </Button>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="アクティビティ" />
              <Tab label="設定" />
              <Tab label="通知" />
            </Tabs>

            {tabValue === 0 && (
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="新しい動画をアップロードしました"
                    secondary="2023/05/01 10:30"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EditIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="動画情報を更新しました"
                    secondary="2023/04/28 15:45"
                  />
                </ListItem>
              </List>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  アカウント設定
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  パスワードを変更
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2, ml: 2 }}
                >
                  アカウントを削除
                </Button>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  通知設定
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="新しい動画のアップロード通知"
                      secondary="メールで通知を受け取る"
                    />
                    <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="システムメンテナンス通知"
                      secondary="メールで通知を受け取る"
                    />
                    <IconButton edge="end">
                      <EditIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPage; 
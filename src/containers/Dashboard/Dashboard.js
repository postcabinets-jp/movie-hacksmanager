import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  VideoLibrary as VideoIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Email as EmailIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            動画学習プラットフォーム - 管理画面
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
              <SettingsIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h5">管理者ダッシュボード</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  システムの管理と監視
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                bgcolor: 'primary.light',
                color: 'white',
              }}
            >
              <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                ユーザー管理
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ユーザーの追加・編集・削除
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 'auto' }}>
                ユーザー一覧
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                bgcolor: 'secondary.light',
                color: 'white',
              }}
            >
              <VideoIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                コンテンツ管理
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                動画の追加・編集・削除
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 'auto' }}>
                コンテンツ一覧
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                bgcolor: 'success.light',
                color: 'white',
              }}
            >
              <EmailIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                メール管理
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                テンプレートの管理と配信
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 'auto', bgcolor: 'success.main' }}
              >
                メール設定
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">システム概要</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h4" gutterBottom>
                    150
                  </Typography>
                  <Typography color="text.secondary">総ユーザー数</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h4" gutterBottom>
                    45
                  </Typography>
                  <Typography color="text.secondary">総動画数</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h4" gutterBottom>
                    1,234
                  </Typography>
                  <Typography color="text.secondary">総視聴回数</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h4" gutterBottom>
                    89%
                  </Typography>
                  <Typography color="text.secondary">平均完了率</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Alert } from '@mui/material';
import { viewingRecordApi, userApi, videoApi } from '../../services';
import { formatDuration } from '../../utils/timeUtils';

const ViewingRecordManagement = () => {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    userId: '',
    videoId: '',
  });

  const fetchUsers = async () => {
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('ユーザー一覧の取得に失敗しました:', err);
    }
  };

  const fetchVideos = async () => {
    try {
      const data = await videoApi.getVideos();
      setVideos(data);
    } catch (err) {
      console.error('動画一覧の取得に失敗しました:', err);
    }
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await viewingRecordApi.getRecords(filters);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError('視聴記録の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchVideos();
    fetchRecords();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    fetchRecords();
  };

  const handleExport = async () => {
    try {
      await viewingRecordApi.exportRecords(filters);
      setSuccess('CSVファイルのエクスポートが完了しました');
    } catch (err) {
      setError('CSVファイルのエクスポートに失敗しました');
      console.error(err);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          視聴記録管理
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                label="開始日"
                value={filters.startDate}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                label="終了日"
                value={filters.endDate}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>ユーザー</InputLabel>
                <Select
                  name="userId"
                  value={filters.userId}
                  onChange={handleFilterChange}
                  label="ユーザー"
                >
                  <MenuItem value="">すべて</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>動画</InputLabel>
                <Select
                  name="videoId"
                  value={filters.videoId}
                  onChange={handleFilterChange}
                  label="動画"
                >
                  <MenuItem value="">すべて</MenuItem>
                  {videos.map((video) => (
                    <MenuItem key={video.id} value={video.id}>
                      {video.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  検索
                </Button>
                <Button variant="outlined" color="primary" onClick={handleExport}>
                  CSVエクスポート
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ユーザー名</TableCell>
              <TableCell>動画タイトル</TableCell>
              <TableCell>視聴時間</TableCell>
              <TableCell>進捗状況</TableCell>
              <TableCell>完了</TableCell>
              <TableCell>最終視聴日時</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.userName}</TableCell>
                <TableCell>{record.videoTitle}</TableCell>
                <TableCell>{formatDuration(record.watchTime)}</TableCell>
                <TableCell>{`${Math.round(record.progress * 100)}%`}</TableCell>
                <TableCell>{record.completed ? '完了' : '未完了'}</TableCell>
                <TableCell>{new Date(record.lastViewedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewingRecordManagement; 
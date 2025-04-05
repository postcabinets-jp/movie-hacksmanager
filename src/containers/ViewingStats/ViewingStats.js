import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Alert } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { viewingRecordApi } from '../../services';
import { formatDuration } from '../../utils/timeUtils';

const ViewingStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await viewingRecordApi.getRecordStats({ period });
        setStats(data);
      } catch (err) {
        setError('統計情報の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" color="error">
          統計情報が見つかりませんでした
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          視聴統計
        </Typography>
      </Box>

      <Box mb={4}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>期間</InputLabel>
          <Select
            value={period}
            label="期間"
            onChange={(e) => setPeriod(e.target.value)}
          >
            <MenuItem value="day">24時間</MenuItem>
            <MenuItem value="week">1週間</MenuItem>
            <MenuItem value="month">1ヶ月</MenuItem>
            <MenuItem value="year">1年</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                基本統計
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    総視聴回数
                  </Typography>
                  <Typography variant="h5">
                    {stats.totalViews}回
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    総視聴者数
                  </Typography>
                  <Typography variant="h5">
                    {stats.uniqueViewers}人
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    平均視聴時間
                  </Typography>
                  <Typography variant="h5">
                    {formatDuration(stats.averageWatchTime)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    完了率
                  </Typography>
                  <Typography variant="h5">
                    {`${Math.round(stats.completionRate)}%`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                時間帯別視聴回数
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.viewsByHour}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" name="視聴回数" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                日別視聴統計
              </Typography>
              <Box height={400}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="views"
                      name="視聴回数"
                      stroke="#2196F3"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="averageWatchTime"
                      name="平均視聴時間（分）"
                      stroke="#4CAF50"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewingStats; 
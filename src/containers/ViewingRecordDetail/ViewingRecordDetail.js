import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';
import { viewingRecordApi } from '../../services';
import { formatDuration } from '../../utils/timeUtils';

const ViewingRecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await viewingRecordApi.getRecord(id);
        setRecord(data);
      } catch (err) {
        setError('視聴記録の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!record) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" color="error">
          視聴記録が見つかりませんでした
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          視聴記録詳細
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    ユーザー名
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {record.userName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    動画タイトル
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {record.videoTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    視聴開始時間
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(record.startTime).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    視聴終了時間
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {new Date(record.endTime).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    視聴時間
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDuration(record.watchTime)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    進捗状況
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {`${Math.round(record.progress * 100)}%`}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    完了状態
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {record.completed ? '完了' : '未完了'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="textSecondary">
                    最終視聴位置
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formatDuration(record.lastPosition)}
                  </Typography>
                </Grid>
              </Grid>
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

export default ViewingRecordDetail; 
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { videoApi } from '../../services';

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    isPublic: true,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videoApi.getVideos();
      setVideos(response);
    } catch (error) {
      console.error('動画の取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (video = null) => {
    if (video) {
      setSelectedVideo(video);
      setFormData({
        title: video.title,
        description: video.description,
        category: video.category,
        tags: video.tags,
        isPublic: video.isPublic,
      });
    } else {
      setSelectedVideo(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: [],
        isPublic: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVideo(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (selectedVideo) {
        await videoApi.updateVideo(selectedVideo.id, formData);
      } else {
        await videoApi.createVideo(formData);
      }
      fetchVideos();
      handleCloseDialog();
    } catch (error) {
      console.error('動画の保存に失敗しました:', error);
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('この動画を削除してもよろしいですか？')) {
      try {
        await videoApi.deleteVideo(videoId);
        fetchVideos();
      } catch (error) {
        console.error('動画の削除に失敗しました:', error);
      }
    }
  };

  const handleToggleVisibility = async (videoId, currentVisibility) => {
    try {
      await videoApi.updateVideo(videoId, { isPublic: !currentVisibility });
      fetchVideos();
    } catch (error) {
      console.error('動画の公開状態の変更に失敗しました:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">動画ライブラリ</Typography>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => handleOpenDialog()}
        >
          新規動画アップロード
        </Button>
      </Box>

      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnailUrl}
                alt={video.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {video.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={video.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {video.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mt: 1 }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      視聴回数: {video.views}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      アップロード日: {new Date(video.uploadDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Tooltip title={video.isPublic ? '非公開にする' : '公開する'}>
                      <IconButton
                        onClick={() => handleToggleVisibility(video.id, video.isPublic)}
                      >
                        {video.isPublic ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="編集">
                      <IconButton onClick={() => handleOpenDialog(video)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="削除">
                      <IconButton onClick={() => handleDelete(video.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedVideo ? '動画の編集' : '新規動画のアップロード'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="タイトル"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="説明"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="カテゴリ"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="プログラミング">プログラミング</MenuItem>
              <MenuItem value="デザイン">デザイン</MenuItem>
              <MenuItem value="ビジネス">ビジネス</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="タグ（カンマ区切り）"
              name="tags"
              value={formData.tags.join(',')}
              onChange={(e) => {
                const tags = e.target.value.split(',').map((tag) => tag.trim());
                setFormData((prev) => ({ ...prev, tags }));
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleSave} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoLibrary; 
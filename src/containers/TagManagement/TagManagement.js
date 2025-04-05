import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { tagApi } from '../../services';

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#000000',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagApi.getTags();
      setTags(response);
    } catch (error) {
      console.error('タグの取得に失敗しました:', error);
      setError('タグの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (tag = null) => {
    if (tag) {
      setSelectedTag(tag);
      setFormData({
        name: tag.name,
        description: tag.description,
        color: tag.color,
      });
    } else {
      setSelectedTag(null);
      setFormData({
        name: '',
        description: '',
        color: '#000000',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTag(null);
    setFormData({
      name: '',
      description: '',
      color: '#000000',
    });
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
      if (selectedTag) {
        await tagApi.updateTag(selectedTag.id, formData);
      } else {
        await tagApi.createTag(formData);
      }
      await fetchTags();
      setSuccess(true);
      handleCloseDialog();
    } catch (error) {
      console.error('タグの保存に失敗しました:', error);
      setError('タグの保存に失敗しました');
    }
  };

  const handleDelete = async (tagId) => {
    if (window.confirm('このタグを削除してもよろしいですか？')) {
      try {
        await tagApi.deleteTag(tagId);
        await fetchTags();
        setSuccess(true);
      } catch (error) {
        console.error('タグの削除に失敗しました:', error);
        setError('タグの削除に失敗しました');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        タグ管理
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
        >
          新規タグ
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>タグ名</TableCell>
              <TableCell>説明</TableCell>
              <TableCell>色</TableCell>
              <TableCell>使用回数</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>
                  <Chip
                    label={tag.name}
                    sx={{
                      backgroundColor: tag.color,
                      color: '#fff',
                    }}
                  />
                </TableCell>
                <TableCell>{tag.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: tag.color,
                      borderRadius: '50%',
                    }}
                  />
                </TableCell>
                <TableCell>{tag.usageCount}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(tag)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tag.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedTag ? 'タグ編集' : '新規タグ'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="タグ名"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="説明"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="色"
                name="color"
                type="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleSave} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          操作が成功しました
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TagManagement; 
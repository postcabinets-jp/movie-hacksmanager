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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { emailTemplateApi } from '../../services';

const EmailTemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    type: 'notification',
    variables: [],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await emailTemplateApi.getTemplates();
      const formattedTemplates = response.map(template => ({
        id: template.id,
        name: template.name || '',
        subject: template.subject || '',
        body: template.body || '',
        type: template.type || 'notification',
        variables: template.variables || [],
      }));
      setTemplates(formattedTemplates);
    } catch (error) {
      console.error('テンプレートの取得に失敗しました:', error);
      setError('テンプレートの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (template = null) => {
    if (template) {
      setSelectedTemplate(template);
      setFormData({
        name: template.name,
        subject: template.subject,
        body: template.body,
        type: template.type,
        variables: template.variables,
      });
    } else {
      setSelectedTemplate(null);
      setFormData({
        name: '',
        subject: '',
        body: '',
        type: 'notification',
        variables: [],
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTemplate(null);
    setFormData({
      name: '',
      subject: '',
      body: '',
      type: 'notification',
      variables: [],
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
      if (selectedTemplate) {
        await emailTemplateApi.updateTemplate(selectedTemplate.id, formData);
      } else {
        await emailTemplateApi.createTemplate(formData);
      }
      await fetchTemplates();
      setSuccess(true);
      handleCloseDialog();
    } catch (error) {
      console.error('テンプレートの保存に失敗しました:', error);
      setError('テンプレートの保存に失敗しました');
    }
  };

  const handleDelete = async (templateId) => {
    if (window.confirm('このテンプレートを削除してもよろしいですか？')) {
      try {
        await emailTemplateApi.deleteTemplate(templateId);
        await fetchTemplates();
        setSuccess(true);
      } catch (error) {
        console.error('テンプレートの削除に失敗しました:', error);
        setError('テンプレートの削除に失敗しました');
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
        メールテンプレート管理
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
          新規テンプレート
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>テンプレート名</TableCell>
              <TableCell>件名</TableCell>
              <TableCell>タイプ</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.name}</TableCell>
                <TableCell>{template.subject}</TableCell>
                <TableCell>{template.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(template)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(template.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTemplate ? 'テンプレート編集' : '新規テンプレート'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="テンプレート名"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>タイプ</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="タイプ"
                >
                  <MenuItem value="notification">通知</MenuItem>
                  <MenuItem value="welcome">ウェルカム</MenuItem>
                  <MenuItem value="password_reset">パスワードリセット</MenuItem>
                  <MenuItem value="verification">認証</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="件名"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="本文"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                multiline
                rows={10}
                helperText="変数は {{変数名}} の形式で使用できます"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                利用可能な変数:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formData.variables.join(', ')}
              </Typography>
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

export default EmailTemplateManagement; 
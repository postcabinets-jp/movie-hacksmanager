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
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { roleApi } from '../../services';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const permissions = [
  'video:view',
  'video:create',
  'video:edit',
  'video:delete',
  'user:view',
  'user:create',
  'user:edit',
  'user:delete',
  'category:view',
  'category:create',
  'category:edit',
  'category:delete',
  'tag:view',
  'tag:create',
  'tag:edit',
  'tag:delete',
  'analytics:view',
  'settings:view',
  'settings:edit',
];

const UserRoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await roleApi.getRoles();
      setRoles(response);
    } catch (error) {
      console.error('ロールの取得に失敗しました:', error);
      setError('ロールの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (role = null) => {
    if (role) {
      setSelectedRole(role);
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    } else {
      setSelectedRole(null);
      setFormData({
        name: '',
        description: '',
        permissions: [],
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      permissions: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (selectedRole) {
        await roleApi.updateRole(selectedRole.id, formData);
      } else {
        await roleApi.createRole(formData);
      }
      await fetchRoles();
      setSuccess(true);
      handleCloseDialog();
    } catch (error) {
      console.error('ロールの保存に失敗しました:', error);
      setError('ロールの保存に失敗しました');
    }
  };

  const handleDelete = async (roleId) => {
    if (window.confirm('このロールを削除してもよろしいですか？')) {
      try {
        await roleApi.deleteRole(roleId);
        await fetchRoles();
        setSuccess(true);
      } catch (error) {
        console.error('ロールの削除に失敗しました:', error);
        setError('ロールの削除に失敗しました');
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
        ユーザー権限管理
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
          新規ロール
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ロール名</TableCell>
              <TableCell>説明</TableCell>
              <TableCell>権限</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  {role.permissions.map((permission) => (
                    <Typography key={permission} variant="body2">
                      {permission}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(role)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(role.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedRole ? 'ロール編集' : '新規ロール'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ロール名"
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
              <FormControl fullWidth>
                <InputLabel>権限</InputLabel>
                <Select
                  multiple
                  value={formData.permissions}
                  onChange={handlePermissionChange}
                  input={<OutlinedInput label="権限" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {permissions.map((permission) => (
                    <MenuItem key={permission} value={permission}>
                      <Checkbox checked={formData.permissions.indexOf(permission) > -1} />
                      <ListItemText primary={permission} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default UserRoleManagement; 
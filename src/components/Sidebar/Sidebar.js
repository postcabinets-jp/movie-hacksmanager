import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'ダッシュボード',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'ユーザー管理',
      icon: <PeopleIcon />,
      path: '/users'
    },
    {
      text: 'カテゴリー管理',
      icon: <CategoryIcon />,
      path: '/categories'
    },
    {
      text: 'タグ管理',
      icon: <LocalOfferIcon />,
      path: '/tags'
    },
    {
      text: '視聴記録管理',
      icon: <VideoLibraryIcon />,
      path: '/viewing-records'
    },
    {
      text: '視聴統計',
      icon: <BarChartIcon />,
      path: '/viewing-stats'
    },
    {
      text: 'システム設定',
      icon: <SettingsIcon />,
      path: '/settings'
    },
    {
      text: 'メールテンプレート',
      icon: <EmailIcon />,
      path: '/email-templates'
    },
    {
      text: 'システムログ',
      icon: <ListAltIcon />,
      path: '/system-logs'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List sx={{ marginTop: '64px' }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 
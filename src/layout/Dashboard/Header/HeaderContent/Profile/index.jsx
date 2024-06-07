import PropTypes from 'prop-types';
import { useRef } from 'react';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import Avatar from 'components/@extended/Avatar';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import React from 'react';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile({ logout, user }) {
  const anchorRef = useRef(null);

  const handleLogout = () => {
    logout();
    location.href = '/login';
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: 'transparent',
          borderRadius: 1
        }}
        ref={anchorRef}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={avatar1} size="sm" />
          <Typography variant="subtitle1">{user?._id && `${user?.name}`}</Typography>
        </Stack>
      </ButtonBase>
      <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
        <LogoutOutlined />
      </IconButton>
    </Box>
  );
}

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number,
  other: PropTypes.any
};

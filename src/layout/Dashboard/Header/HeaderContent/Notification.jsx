import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import BellOutlined from '@ant-design/icons/BellOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

import { useNotofication } from './../../../../hooks/useNotofication';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

export default function Notification({ user }) {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const { read, master, transferLogLists, handleReadTransferLog, handleReadTransferLogAll } = useNotofication();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      transferLogLists({ userId: user?._id, page: 1, per_page: 5 });
    }
  }, [user]);

  const handleToggle = async () => {
    setOpen((prevOpen) => {
      if (!prevOpen) {
        transferLogLists({ userId: user?._id, page: 1, per_page: 5 });
      }

      return !prevOpen;
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleReadNotication = async (id) => {
    const result = await handleReadTransferLog(id);
    if (result.status == 200) {
      transferLogLists({ userId: user?._id, page: 1, per_page: 5 });
    }
  };

  const handleReadAllNotication = async (userId) => {
    const result = await handleReadTransferLogAll(userId);
    if (result.status == 200) {
      transferLogLists({ userId: user?._id, page: 1, per_page: 5 });
    }
  };

  const iconBackColorOpen = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [matchesXs ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title="Mark as all read">
                          <IconButton color="success" size="small" onClick={() => handleReadAllNotication(user?._id)}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {!master?.data && (
                      <>
                        <Typography variant="subtitle2" align="center" py={1}>{`${master?.message}`}</Typography>
                        <Divider />
                      </>
                    )}
                    {master?.data &&
                      master?.data.map((list, i) => {
                        const notificationDate = new Date(list.date);
                        const formattedDate =
                          formatDistanceToNow(notificationDate, { addSuffix: true }) +
                          (notificationDate > new Date() ? '' : `, ${format(notificationDate, 'HH:mm')}`);
                        return (
                          <Box key={`transfer-log-${i}`}>
                            <ListItemButton selected={!list?.isRead} onClick={() => handleReadNotication(list?._id)}>
                              <ListItemAvatar>
                                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                                  {list?.type === 'debit' ? 'D' : 'C'}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="h6">
                                    <Typography component="span" variant="subtitle1">
                                      {list?.type === 'debit' ? `${list?.sender_id?.name}` : `${list?.receiver_id?.name}`}
                                    </Typography>{' '}
                                    {list?.type === 'debit' ? 'sent' : 'received'} {`${list?.amount}`} coins{' '}
                                    {list?.type === 'debit' ? 'to' : 'from'}{' '}
                                    <Typography component="span" variant="subtitle1">
                                      {list?.type === 'debit' ? `${list?.receiver_id?.name}` : `${list?.sender_id?.name}`}.
                                    </Typography>
                                  </Typography>
                                }
                                secondary={formattedDate}
                              />
                            </ListItemButton>
                            <Divider />
                          </Box>
                        );
                      })}
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

Notification.propTypes = {
  user: PropTypes.object
};

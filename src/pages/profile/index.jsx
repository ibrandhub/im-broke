import { useState, useEffect } from 'react';
import { Card, Box, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

import { useProfile } from './hooks/useProfile';
import { AuthService } from './../../hooks/auth-service';

export default function Profile() {
  const { getUserData } = AuthService();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const { handleSubmitProfile } = useProfile(user?._id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res) {
        setUser(res);
      } else {
        handleLogout();
      }
    };

    fetchUser();
  }, []);

  const handleOpenModal = (receiverId, type) => {
    if (receiverId) {
      setOpen(true);
      setType(type);
    }
  };

  const handleClose = () => {
    setError('');
    setOpen(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Implement profile or password update logic here
    try {
      await handleSubmitProfile({ name: user?.name });
      setPassword('');
      handleClose();
      setIsLoading(false);
    } catch (err) {
      setPassword('');
      setIsLoading(false);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleSubmitPassword = async () => {
    setIsLoading(true);
    // Implement password update logic here
    try {
      if (password) {
        await handleSubmitProfile({ password: password });
        handleClose();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError('Password cannot be empty.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <Card>
      <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5">Profile</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" sx={{ ml: 'auto' }} onClick={() => handleOpenModal(user?._id, 'profile')}>
            Edit Profile
          </Button>
          <Button variant="outlined" size="small" sx={{ ml: 'auto' }} onClick={() => handleOpenModal(user?._id, 'password')}>
            Edit Password
          </Button>
        </Stack>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5">User Information</Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">Email: {user?.email || ''}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Name: {user?.name || ''}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Current Balance: {user?.coin || 0} coins</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* error */}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit {type === 'profile' ? 'Profile' : 'Password'}</DialogTitle>
        <DialogContent>
          {type === 'profile' ? (
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={user?.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {type === 'profile' ? (
            <Button disabled={isLoading} onClick={handleSubmit}>
              Save
            </Button>
          ) : (
            <Button disabled={isLoading} onClick={handleSubmitPassword}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Card>
  );
}

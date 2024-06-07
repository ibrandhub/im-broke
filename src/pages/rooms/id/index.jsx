import { Card, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRoomData } from './../hooks/useRoomData';
import { AuthService } from './../../../hooks/auth-service';
import { useNavigate } from 'react-router-dom';

export default function RoomsPageId() {
  const { master, fetchData, handleSubmitCoin, handleSubmitLeaveRoom, handleSubmitCloseRoom, handleSubmitSummaryRoom } = useRoomData();
  const { getUserData } = AuthService();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [coin, setCoin] = useState(0);
  const [error, setError] = useState('');
  const [receiverId, setReceiverId] = useState(null);
  const [summary, setSummary] = useState(null);

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

  const handleOpenModal = (receiverId) => {
    if (receiverId) {
      setReceiverId(receiverId);
      setOpen(true);
      setCoin(master?.rateDefault);
    }
  };

  const handleClose = () => {
    setError('');
    setOpen(false);
    setReceiverId(null);
  };

  const handleTransfer = async () => {
    if (!user || !receiverId) {
      setError('Something wrong!');
      return;
    }

    if (coin <= 0) {
      setError('Transfer amount must be greater than 0');
      return;
    }

    const result = await handleSubmitCoin(receiverId, user?._id, coin, master?._id);
    if (result.status === 200) {
      setError('');
      setOpen(false);
      setCoin(0);
      fetchData();
    } else {
      setError(result.response.data.message);
      setCoin(0);
      fetchData();
    }
  };

  const handleLeaveRoom = async (roomId, userId) => {
    const result = await handleSubmitLeaveRoom({ roomId, userId });

    if (result.status == 200) {
      navigate(`/rooms`);
    }
  };

  const handleSummary = async (roomId, userId) => {
    const result = await handleSubmitSummaryRoom({ roomId, userId });
    if (result.status == 200) {
      setSummary(result.data);
      setOpenSummary(true);
    }
  };

  const handleCloseSummary = () => {
    setOpenSummary(false);
  };

  const handleCloseRoom = async (roomId, ownerId) => {
    const result = await handleSubmitCloseRoom({ roomId, ownerId });

    if (result.status == 200) {
      navigate(`/rooms`);
    }
  };

  const oddColor = '#f0f0f0'; // สีพื้นหลังสำหรับแถวคี่
  const evenColor = '#ffffff'; // สีพื้นหลังสำหรับแถวคู่

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '@media(max-width: 500px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
                p: 0
              }
            }}
          >
            <Box>
              <Typography variant="h4" color="primary">
                {master?.name ? master?.name : 'Room not found!'}
              </Typography>

              {master?.rateDefault > 0 && (
                <Typography variant="subtitle1" color="secondary">{`( Room rate default: ${master?.rateDefault} )`}</Typography>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gridGap: '8px',

                '@media(max-width: 500px)': {
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }
              }}
            >
              <Button
                variant="outlined"
                color="info"
                onClick={() => handleSummary(master?._id, user?._id)}
                sx={{
                  '@media(max-width: 500px)': {
                    width: '100%'
                  }
                }}
              >
                Summary
              </Button>
              {master?.owner_id !== user?._id ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleLeaveRoom(master?._id, user?._id)}
                  sx={{
                    '@media(max-width: 500px)': {
                      width: '100%'
                    }
                  }}
                >
                  Leave room
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCloseRoom(master?._id, user?._id)}
                  sx={{
                    '@media(max-width: 500px)': {
                      width: '100%',
                      my: 1
                    }
                  }}
                >
                  Close room
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        {master?.users &&
          master.users.map((data) => {
            const style = {
              backgroundColor: data?._id === user?._id ? '#f0f0f0' : 'transparent',
              cursor: data?._id === user?._id ? 'normal' : 'pointer'
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={data._id}
                onClick={() => {
                  if (data?._id === user?._id) {
                    console.log('Me');
                  } else {
                    handleOpenModal(data?._id);
                  }
                }}
              >
                <Card sx={{ p: 3, width: '100%', ...style }}>
                  <Typography variant="subtitle1" color="primary">
                    Name: {data.name} {data._id === user?._id ? '(Me)' : ''}
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    Coin: {data.coin}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <Dialog fullWidth maxWidth={'xs'} open={open} onClose={handleClose}>
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Coin"
            name="coin"
            value={coin}
            onChange={(e) => {
              setCoin(e.target.value);
              if (e.target.value > 0) setError('');
            }}
            variant="filled"
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleTransfer} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth={'xs'} open={openSummary} onClose={handleCloseSummary}>
        <DialogTitle variant="h5">{summary?.room}</DialogTitle>
        <DialogContent dividers>
          {summary?.transactions &&
            summary.transactions.map((s, i) => {
              return (
                <Box
                  key={`summary-${i}`}
                  sx={{
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: i % 2 === 0 ? evenColor : oddColor
                  }}
                >
                  <Typography variant="h6">
                    {`Paid to `}
                    <Typography component="span" variant="subtitle1">
                      {`${s.receiver} `}
                    </Typography>
                  </Typography>
                  <Typography variant="h6">
                    <Typography component="span" variant="subtitle1" color={'primary'}>
                      {`${s.amount} `}
                    </Typography>
                  </Typography>
                </Box>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSummary}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

import { useState, useEffect } from 'react';
import { CrownTwoTone } from '@ant-design/icons';
import { Card, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

import { useRanking } from './hooks/useRanking';
import { AuthService } from './../../hooks/auth-service';

export default function RankingPage() {
  const { master, fetchData, handleSubmitCoin } = useRanking();
  const { getUserData } = AuthService();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState(0);
  const [error, setError] = useState('');
  const [receiverId, setReceiverId] = useState(null);

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

    const result = await handleSubmitCoin(receiverId, user?._id, coin, null);
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

  return (
    <Card>
      <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #f0f0f0' }}>
        <Typography variant="h5">Ranking</Typography>
      </Box>
      <Box>
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'text.primary',
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <Typography variant="h6">
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '45px' }}>
                <Typography variant="subtitle1">{`No.`}</Typography>
              </Box>
              <Typography component="span" variant="subtitle1">{`Name`}</Typography>
            </Box>
          </Typography>
          <Typography variant="subtitle1">{`Coin`}</Typography>
        </Box>
        {master &&
          master.map((m, i) => {
            return (
              <Box
                key={`ranking-${i}`}
                onClick={() => {
                  if (m?.userId == user?._id) {
                    console.log('Me');
                  } else {
                    handleOpenModal(m?.userId);
                  }
                }}
                sx={{
                  px: 2,
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: m?.userId == user?._id ? '#e6f4ff' : '',
                  borderBottom: '1px solid #f0f0f0',
                  '&:last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                <Typography variant="h6">
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '45px', display: 'flex', alignItems: 'center' }}>
                      {m?.no <= 3 && (
                        <CrownTwoTone
                          style={{ marginRight: '8px' }}
                          twoToneColor={m?.no == 1 ? '#ffc53d' : m?.no == 2 ? '#bfbfbf' : '#fa541c'}
                        />
                      )}
                    </Box>
                    <Typography component="span" variant="subtitle1">{`${m.name}`}</Typography>
                  </Box>
                </Typography>
                <Typography variant="subtitle1" color={'primary'}>
                  {m.totalBalance}
                </Typography>
              </Box>
            );
          })}
      </Box>

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
    </Card>
  );
}

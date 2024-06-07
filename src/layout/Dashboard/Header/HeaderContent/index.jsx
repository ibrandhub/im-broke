import { useEffect, useState } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { AuthService } from './../../../../hooks/auth-service';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [user, setUser] = useState(null);

  const { logout, getUserData } = AuthService();

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

  const handleLogout = () => {
    logout();
    location.href = '/login';
  };

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}
      <Notification user={user} />
      {!downLG && <Profile logout={logout} user={user} />}
      {downLG && <MobileSection logout={logout} user={user} />}
    </>
  );
}

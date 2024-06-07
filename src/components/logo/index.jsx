import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import Stack from '@mui/material/Stack';
import LogoWeb from './../../assets/images/icons/logo.png';
// import { Icon } from '@ant-design/icons';

// project import
// import Logo from './LogoMain';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const keyframesStyle2 = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  const spinStyle = {
    animation: 'spin 2s linear infinite'
  };

  const keyframesStyle = `
    @keyframes jump {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-80px) rotate(360deg); 
      }
  
    }
  `;

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '80px', // Adjust as needed
    position: 'relative'
  };

  const imgStyle = {
    width: '35px',
    animation: 'jump 2s infinite',
    position: 'relative',
    bottom: '0'
  };

  const imgStyle1 = {
    ...imgStyle,
    animationDelay: '0s'
  };

  const imgStyle2 = {
    ...imgStyle,
    animationDelay: '0.5s'
  };

  const imgStyle3 = {
    ...imgStyle,
    animationDelay: '1s'
  };

  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <style>
        {keyframesStyle}
        {keyframesStyle2}
      </style>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={sx === undefined || sx?.width === 'auto' ? containerStyle : {}}
      >
        {/* {sx === undefined || sx?.width === 'auto' ? <Logo /> : 'X'} */}
        {sx === undefined || sx?.width === 'auto' ? (
          <>
            <img src={LogoWeb} alt="logo" loading="lazy" style={imgStyle1} />
            <img src={LogoWeb} alt="logo" loading="lazy" style={imgStyle2} />
            <img src={LogoWeb} alt="logo" loading="lazy" style={imgStyle3} />
          </>
        ) : (
          <img src={LogoWeb} alt="logo" loading="lazy" width={35} style={spinStyle} />
        )}
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;

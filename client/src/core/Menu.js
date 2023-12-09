import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ContactIcon from '@material-ui/icons/ContactsOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import myImage from './images/MK.PNG';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: 'black', textDecoration: 'none' };
  } else {
    return { color: 'white', textDecoration: 'none' };
  }
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#E7385E',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>PROFILE</MenuItem>
      <MenuItem onClick={handleMenuClose}>MY ACCOUNT</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div>
        <MenuItem>
          <Link style={isActive(history, '/')} to='/'>
            <IconButton aria-label='Home' color='inherit'>
              <HomeIcon />
            </IconButton>
            Home
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/shop')} to='/shop'>
            <IconButton aria-label='Shop' color='inherit'>
              <StorefrontIcon />
            </IconButton>
            Shop
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/cart')} to='/cart'>
            <IconButton aria-label='Cart' color='inherit'>
              <Badge badgeContent={itemTotal()} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            Cart
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={isActive(history, '/Contact')} to='/contact'>
            <IconButton aria-label='Shop' color='inherit'>
              <ContactIcon />
            </IconButton>
            Contact Us
          </Link>
        </MenuItem>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <MenuItem>
            <Link
              style={isActive(history, '/user/dashboard')}
              to='/user/dashboard'
            >
              <IconButton aria-label='Dashboard' color='inherit'>
                <DashboardIcon />
              </IconButton>
              Dashboard
            </Link>
          </MenuItem>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <MenuItem>
            <Link
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              <IconButton aria-label='Dashboard' color='inherit'>
                <DashboardIcon />
              </IconButton>
              Dashboard
            </Link>
          </MenuItem>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <MenuItem>
              <Link style={isActive(history, '/signin')} to='/signin'>
                <IconButton aria-label='Signin' color='inherit'>
                  <AccountCircleIcon />
                </IconButton>
                SignIn
              </Link>
            </MenuItem>

            <MenuItem>
              <Link style={isActive(history, '/signup')} to='/signup'>
                <IconButton aria-label='Signup' color='inherit'>
                  <PersonAddIcon />
                </IconButton>
                SignUp
              </Link>
            </MenuItem>
          </Fragment>
        )}

        {isAuthenticated() && (
          <MenuItem>
            <span
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              <IconButton aria-label='Signout' color='inherit'>
                <ExitToAppIcon />
              </IconButton>
              SignOut
            </span>
          </MenuItem>
        )}
      </div>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.header}>
        <Toolbar>
          <img src={myImage} alt="logo" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
          <a href='/' style={{ color: '#ffffff', textDecoration: 'none' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              MK SHOP
            </Typography>
          </a>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link style={isActive(history, '/')} to='/'>
              <IconButton aria-label='Home' color='inherit'>
                <HomeIcon />
                <Typography noWrap >HOME</Typography>
              </IconButton>
            </Link>

            <Link style={isActive(history, '/shop')} to='/shop'>
              <IconButton aria-label='Shop' color='inherit'>
                <StorefrontIcon />
                <Typography noWrap >SHOP</Typography>
              </IconButton>
            </Link>

            <Link style={isActive(history, '/cart')} to='/cart'>
              <IconButton aria-label='Cart' color='inherit'>
                <Badge badgeContent={itemTotal()} color='secondary'>
                  <ShoppingCartIcon />
                </Badge>
                <Typography noWrap >CART</Typography>
              </IconButton>
            </Link>

            <Link style={isActive(history, '/contact')} to='/contact'>
              <IconButton aria-label='Contact' color='inherit'>
                <ContactIcon />
                <Typography noWrap >CONTACT</Typography>
              </IconButton>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit'>
                  <DashboardIcon />
                  <Typography noWrap >DASHBOARD</Typography>
                </IconButton>
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit'>
                  <DashboardIcon />
                  <Typography noWrap >DASHBOARD</Typography>
                </IconButton>
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, '/signin')} to='/signin'>
                  <IconButton aria-label='Signin' color='inherit'>
                    <AccountCircleIcon />
                    <Typography noWrap >SIGNIN</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, '/signup')} to='/signup'>
                  <IconButton aria-label='Signup' color='inherit'>
                    <PersonAddIcon />
                    <Typography noWrap >SIGNUP</Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}

            {isAuthenticated() && (
              <span
                style={{ cursor: 'pointer', color: '#ffffff' }}
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                <IconButton aria-label='Signout' color='inherit'>
                  <ExitToAppIcon />
                  <Typography noWrap >SignOut</Typography>
                </IconButton>
              </span>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(MaterialAppBar);

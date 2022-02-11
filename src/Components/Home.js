import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BrowserRouter as Router, Link, useLocation, Route, Switch, useHistory } from 'react-router-dom';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openExternalServer, setOpenExternalServer] = React.useState(false);
  const [openServer, setOpenServer] = React.useState(false);
  const [openMessaging, setOpenMessaging] = React.useState(false);
  const [openDashboard, setOpenDashboard] = React.useState(false);
  const [specificPage, setSpecificPage] = React.useState("dashboard");
  const [value, setValue] = React.useState(0);

  const history = useHistory();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickMessaging = () => {
    setOpenMessaging(!openMessaging);
    setSpecificPage("messaging");
  };

  const handleClickServer = () => {
    setOpenServer(!openServer);
    setSpecificPage("statictics");
  };

  const handleClickExternalServer = () => {
    setOpenExternalServer(!openExternalServer);
    setSpecificPage("sftp");
  };

  const handleClickDashboard = () => {
    setOpenDashboard(!openDashboard);
    setSpecificPage("overview");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            WebMethods IS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton dense onClick={ () => { handleClickDashboard(); history.push("/"); } }>
            <ListItemIcon>
              <SpeedRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            {openDashboard ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDashboard} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => setSpecificPage("overview")}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Overview</Typography>} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton dense onClick={handleClickServer}>
            <ListItemIcon>
              <DnsRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Server" />
            {openServer ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openServer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("remote"); history.push("/server/statistics/"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Statistics</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("proxy"); history.push("/server/license/"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Licensing</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("remote"); history.push("/remoteServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Ports</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("proxy"); history.push("/proxyServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Scheduling</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("remote"); history.push("/remoteServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Service Usage</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("proxy"); history.push("/proxyServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Quisece</Typography>} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton dense onClick={handleClickExternalServer}>
            <ListItemIcon>
              <StorageRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="External Server" />
            {openExternalServer ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openExternalServer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("sftp"); history.push("/sftp"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>SFTP</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("remote"); history.push("/remoteServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Remote Server</Typography>} />
              </ListItemButton>
              <ListItemButton sx={{ ...(open ===true && { pl: 9 }),}} onClick={() => {setSpecificPage("proxy"); history.push("/proxyServer"); }}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Proxy Server</Typography>} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton dense onClick={handleClickMessaging}>
            <ListItemIcon>
              <MessageRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary="Messaging" />
            {openMessaging ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMessaging} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ ...(open ===true && { pl: 6 }),}} onClick={() => setSpecificPage("messaging")}>
                <ListItemText sx={{ lineHeight: 1, margin: 0 }}  primary={<Typography sx={{ ...(open ===false && { fontSize:'default' }),...(open ===true && { fontSize:16 }),}}>Messaging Configuration</Typography>} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1}}>
        <DrawerHeader />
        <Tabs
          sx={{ pl: 1 }}
          onChange={handleChange}
          value={value}
          aria-label="Tabs where each tab needs to be selected manually">
          <Tab label="IS 1" />
          <Tab label="IS 2" />
          <Tab label="IS 3" />
        </Tabs>
        
      </Box>
    </Box>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MuiAlert from '@mui/material/Alert';
import { Link, useHistory } from 'react-router-dom';
import Home from '../Home';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbars from '../SnackBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';


export default function Remote() {
  const [rows, setRows] = useState([]);
  const [currentDeletingRemote, setcurrentDeletingRemote] = React.useState('');
  const history = useHistory();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [testingAlias, setTestingAlias] = React.useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(async () => {
    await Axios(
      "http://localhost:5000/api/getRemote", {
      method: 'GET',
    }).then((result) => {
      let server = [];
      for (let row of result.data.remoteServers) {
        server.push(row);
      }
      setRows(server);
    })
  }, []);


  const deleteRemote = async () => {
    await Axios.post(
      "http://localhost:5000/api/deleteRemote",
      { "alias": currentDeletingRemote }
    ).then(async (result) => {
      if (result.status === 200) {
        setShowSnackbar(true);
        setSnackbarMessage(`${currentDeletingRemote} Remote Server Alias was Deleted Successfully!`);
        setSnackbarSeverity("info");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 5000);
        await Axios.get(
          "http://localhost:5000/api/getRemote"
        ).then((result) => {
          let server = [];
          for (let row of result.data.remoteServers) {
            server.push(row);
          }
          setRows(server);
          handleCloseDialog();
        })
      }
      else {
        console.log(result);
      }
    })
  }

  const testRemote = async (alias) => {
    setTestingAlias(alias);
    setTesting(true);
    await Axios.post(
      "http://localhost:5000/api/testRemote",
      { "alias": alias }
    ).then(async (result) => {
      setTesting(false);
      if (result.status === 200) {
        if (result.data.status === 400) {
          setShowSnackbar(true);
          setSnackbarMessage(result.data.message);
          setSnackbarSeverity("error");
          setTimeout(() => {
            setShowSnackbar(false);
          }, 5000);
        } else if (result.data.status === 200) {
          setShowSnackbar(true);
          setSnackbarMessage(result.data.message);
          setSnackbarSeverity("success");
          setTimeout(() => {
            setShowSnackbar(false);
          }, 5000);
        }
      }
      else {
        console.log(result);
      }
    })
  }

  const editRemote = async (row) => {
    history.push({
      pathname: "/remoteServer/editRemote",
      state: { ...row }
    })
  }

  return (
    <div>
      <Home />
      {showSnackbar && <Snackbars message={snackbarMessage} severity={snackbarSeverity} />}
      <div className="container pt-2">
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/">
            Administration
          </Link>
          <Typography color="text.primary">Remote Server</Typography>
        </Breadcrumbs>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {window.location.hostname + ":" + window.location.port + " says"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              OK to delete remote server "{currentDeletingRemote}" from configuration?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={deleteRemote} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div className="d-flex justify-content-between pt-4">
          <div className="float-start">
            <p className="fw-bolder ps-1">Remote Server List</p>
          </div>
          <div className="float-end">
            <Link to="/remoteServer/addRemote">
              <Button variant="contained" size='small' startIcon={<AddCircleOutlineIcon />}>
                New
              </Button>
            </Link>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'text.disabled' }}>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Alias</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Host</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Port</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>SSL</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Execute ACL</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>KeepAlive Conns</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Timeout</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Test</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ?
                <TableRow><TableCell align="center" colSpan={10}>No Remote Server is created yet!</TableCell></TableRow> :
                rows.map((row) => (
                  <TableRow
                    key={row.alias}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell size='small'>{row.alias}</TableCell>
                    <TableCell size='small'>{row.host}</TableCell>
                    <TableCell size='small'>{row.port}</TableCell>
                    <TableCell size='small'>{row.user}</TableCell>
                    <TableCell size='small'>{row.ssl === true ? "Yes" : "No"}</TableCell>
                    <TableCell size='small'>{row.acl}</TableCell>
                    <TableCell size='small'>{row.keepalive}</TableCell>
                    <TableCell size='small'>{row.timeout}</TableCell>
                    <TableCell size='small'>
                      {
                        testing === true && testingAlias === row.alias ?
                          <Tooltip title="Loading">
                            <CircularProgress size={25} />
                          </Tooltip> :
                          <Tooltip title="Test">
                            <IconButton onClick={() => { testRemote(row.alias) }} aria-label="Test" size="small" color='primary'>
                              <PlayArrowIcon fontSize="medium" />
                            </IconButton>
                          </Tooltip>
                      }
                    </TableCell>
                    <TableCell size='small'>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => { editRemote(row) }} aria-label="edit" size="small" color='primary'>
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => { handleClickOpen(); setcurrentDeletingRemote(row.alias); }} aria-label="delete" size="small" color='error'>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
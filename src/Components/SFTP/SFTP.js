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
import { Link, useHistory } from 'react-router-dom';
import Home from '../Home';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbars from '../SnackBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';



export default function SFTP() {
  const [rows, setRows] = useState([]);
  const [currentDeletingSFTP, setcurrentDeletingSFTP] = React.useState('');
  const history = useHistory(); 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(async()=>{
    await Axios(
      "http://localhost:5000/api/getSftpServer", {
      method: 'GET',
    }).then((result)=>{
      console.log(result.data.sftpServerAliases);
      let server = [];
      for(let row of result.data.sftpServerAliases){
        server.push(row);
      }
      setRows(server);
    })
  }, []);
  

  const deleteSFTP = async() =>{
    await Axios.post(
      "http://localhost:5000/api/deleteSFTP",
      { "SFTPAlias": currentDeletingSFTP }
    ).then(async(result)=>{
      if(result.status===200){
        setShowSnackbar(true);
        setSnackbarMessage(`${currentDeletingSFTP} SFTP Server Alias was Deleted Successfully!`);
        setSnackbarSeverity("info");
        setTimeout(()=>{
          setShowSnackbar(false);
        }, 5000);
        await Axios.get(
          "http://localhost:5000/api/getSftpServer"
        ).then((result)=>{
          let server = [];
          for(let row of result.data.sftpServerAliases){
            server.push(row);
          }
          // console.log(server);
          setRows(server);
          handleCloseDialog();
        })
      }
      else{
        console.log(result);
      }
    })
  }

  const editSFTP = async(row) =>{
    history.push({
      pathname: "/SFTP/editSFTP",
      state: {...row}
    })
  }

  return (
    <div>
      <Home/>
    <div className="container pt-2">
      {showSnackbar && <Snackbars message={snackbarMessage} severity={snackbarSeverity} />}
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
          OK to delete the SFTP alias "{currentDeletingSFTP}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deleteSFTP} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/dashboard">
          Administration
        </Link>
        <Typography color="text.primary">SFTP</Typography>
      </Breadcrumbs>
      <div className="d-flex justify-content-between mt-4">
        <div className="float-start">
          <p className="fw-bolder ps-1">SFTP Server List</p>
        </div>
        <div className="float-end">
          <Link to="/SFTP/addSFTP">
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
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Proxy Alias</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Host Key Fingerprint</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.length === 0 ? 
            <TableRow><TableCell align="center" colSpan={7}>No SFTP Server is created yet!</TableCell></TableRow> : 
            rows.map((row) => (
              <TableRow
                key={row.alias}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell size='small'>{row.alias}</TableCell>
                <TableCell size='small'>{row.hostName}</TableCell>
                <TableCell size='small'>{row.port}</TableCell>
                <TableCell size='small'>{row.proxyAlias===null ? "Null" : row.proxyAlias}</TableCell>
                <TableCell size='small'>{row.fingerprint}</TableCell>
                <TableCell size='small'>
                  <Tooltip title="Edit">
                    <IconButton onClick={()=>{ editSFTP(row) }} aria-label="edit" size="small" color='primary'>
                      <EditIcon fontSize="inherit"/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={()=>{handleClickOpen(); setcurrentDeletingSFTP(row.alias);}} aria-label="delete" size="small" color='error'>
                      <DeleteIcon fontSize="inherit"/>
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
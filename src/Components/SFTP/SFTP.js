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
  const [currentDeletingProxy, setCurrentDeletingProxy] = React.useState('');
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
    // await Axios(
    //   "http://localhost:5000/api/getProxy", {
    //   method: 'GET',
    // }).then((result)=>{
    //   let server = [];
    //   for(let row of result.data.proxies){
    //     server.push(row);
    //   }
    //   setRows(server);
    // })
    // try {
    //   await Axios(
    //       "http://localhost:5555/admin/proxy?expand=true",{
    //         method: "GET",
    //         auth: {
    //           "username": "Administrator",
    //           "password": "manage"
    //         },
    //         headers:{
    //           "Access-Control-Allow-Origin": "*"
    //         }
    //       }
    //     ).then((result)=>{
    //         let server = [];
    //         for(let row of result.data.proxies){
    //           server.push(row);
    //         }
    //         // console.log(server);
    //         setRows(server);
    //       })
    // }
    // catch (err) {
    //   console.log("error");
    //   console.log(err);
    // }
  }, []);
  

  const deleteRemote = async() =>{
    await Axios.post(
      "http://localhost:5000/api/deleteProxy",
      { "proxyAlias": currentDeletingProxy }
    ).then(async(result)=>{
      if(result.status===200){
        setShowSnackbar(true);
        setSnackbarMessage(`${currentDeletingProxy} Proxy Server Alias was Deleted Successfully!`);
        setSnackbarSeverity("info");
        setTimeout(()=>{
          setShowSnackbar(false);
        }, 5000);
        await Axios.get(
          "http://localhost:5000/api/getProxy"
        ).then((result)=>{
          let server = [];
          for(let row of result.data.proxies){
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

  const editProxy = async(row) =>{
    history.push({
      pathname: "/proxyServer/editProxy",
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
          OK to delete the proxy alias "{currentDeletingProxy}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deleteRemote} autoFocus>
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
        {/* <div className="float-end">
          <Link to="/proxyServer/addProxy">
            <Button variant="contained" size='small' startIcon={<AddCircleOutlineIcon />}>
              New
            </Button>
          </Link>
        </div> */}
      </div>
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: 'text.disabled' }}>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Alias</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Protocol</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Host</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Port</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Enabled</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.length === 0 ? 
            <TableRow><TableCell align="center" colSpan={7}>No Proxy Server is created yet!</TableCell></TableRow> : 
            rows.map((row) => (
              <TableRow
                key={row.proxyAlias}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell size='small'>{row.proxyAlias}</TableCell>
                <TableCell size='small'>{row.protocol}</TableCell>
                <TableCell size='small'>{row.host}</TableCell>
                <TableCell size='small'>{row.port}</TableCell>
                <TableCell size='small'>{row.username}</TableCell>
                <TableCell size='small'>{row.status==="Enabled" ? "Yes" : "No"}</TableCell>
                <TableCell size='small'>
                  <Tooltip title="Edit">
                    <IconButton onClick={()=>{ editProxy(row) }} aria-label="edit" size="small" color='primary'>
                      <EditIcon fontSize="inherit"/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={()=>{handleClickOpen(); setCurrentDeletingProxy(row.proxyAlias);}} aria-label="delete" size="small" color='error'>
                      <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
    </div>
  );
}
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
import { Link } from 'react-router-dom';



export default function Home() {
  const [rows, setRows] = useState([]);

  useEffect(async() =>{
    await Axios.get(
      "http://localhost:5000/api/"
    ).then((result)=>{
      let server = [];
      for(let row of result.data.proxies){
        server.push(row);
      }
      console.log(server);
      setRows(server);
    })
  }, [])

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between">
        <div className="float-start">
          <p className="fw-bolder ps-1">Proxy Server List</p>
        </div>
        <div className="float-end">
          <Link to="/addProxy">
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
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Protocol</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Host</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Port</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Enabled</TableCell>
                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.length === 0 ? <TableRow><TableCell>No Proxy Server is created yet!</TableCell></TableRow> : rows.map((row) => (
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
                  <IconButton aria-label="edit" size="small" color='primary'>
                    <EditIcon fontSize="inherit"/>
                  </IconButton>
                  <IconButton aria-label="delete" size="small" color='error'>
                    <DeleteIcon fontSize="inherit"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
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
import { Link, useHistory } from 'react-router-dom';
import Home from '../../Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';


const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const Statistics = () => {

    const [rows, setRows] = useState([]);
    const [resultData, setResultData] = useState(null);
    const history = useHistory();

    useEffect(async () => {
        await Axios(
            "http://localhost:5000/api/statistics", {
            method: 'GET',
        }).then((result) => {
            if(result.data.name === "Error"){
                console.log("error");
            }
            setRows(Object.keys(result.data.integrationServer).slice(3));
            setResultData(result);
        })
    }, []);

    return (
        <div>
            <Home />
            <div className="container pt-2">
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        Administration
                    </Link>
                    <Typography color="text.primary">Statistics</Typography>
                </Breadcrumbs>
                <div className="d-flex justify-content-between mt-4" style={{ width: 600 }}>
                    <div className="float-start">
                        <p className="fw-bolder ps-1">Statistics</p>
                    </div>
                </div>
                <Root sx={{ maxWidth: '100%', width: 600 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'text.disabled' }}>
                                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Feature Name</TableCell>
                                <TableCell size='small' sx={{ fontWeight: 'bold' }}>Enabled</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {resultData!==null && rows.map((row, index) => (
                                <TableRow key={row}>
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.data.integrationServer[row]}</TableCell>
                                </TableRow>  
                            ))}
                        </TableBody>
                    </Table>
                </Root>
            </div>
        </div>
    );
}

export default Statistics;
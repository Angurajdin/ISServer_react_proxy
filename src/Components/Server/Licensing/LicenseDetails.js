import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link, useLocation } from 'react-router-dom';
import Home from '../../Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
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

const LicenseDetails = () => {

    const location = useLocation();
    const resultData = location.state?.resultData;
    const licenseInformation = Object.keys(resultData.licenseInformation); 
    const integrationServer = Object.keys(resultData.integrationServer); 
    const productInformation = Object.keys(resultData.productInformation); 
    const salesInformation = Object.keys(resultData.salesInformation); 
    const terracotta = Object.keys(resultData.terracotta); 
    const tradingNetworks = Object.keys(resultData.tradingNetworks); 
    

    return (  
        <div>
            <Home />
            <div className="container pt-2">
                <Breadcrumbs maxItems={3} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        Administration
                    </Link>
                    <Link underline="hover" color="inherit" to="/server/license">
                        License
                    </Link>
                    <Typography color="text.primary">Licensing Details</Typography>
                </Breadcrumbs>
                
                <div className='mt-3'>
                    <p className="fw-bold">Sales Information</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {salesInformation.length>0 && salesInformation.map((row, index) => (
                                <TableRow
                                    key={row}
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.salesInformation[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
                <div className='mt-5'>
                    <p className="fw-bold">Product Information</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {productInformation.length>0 && productInformation.map((row, index) => (
                                <TableRow
                                    key={row}
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.productInformation[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
                <div className='mt-5'>
                    <p className="fw-bold">Integration Server</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {integrationServer.length>0 && integrationServer.map((row, index) => (
                                <TableRow
                                    key={row}
                                    
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.integrationServer[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
                <div className='mt-5'>
                    <p className="fw-bold">License Information</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {licenseInformation.length>0 && licenseInformation.map((row, index) => (
                                <TableRow
                                    key={row}
                                    
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.licenseInformation[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
                <div className='mt-5'>
                    <p className="fw-bold">Trading Networks</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {tradingNetworks.length>0 && tradingNetworks.map((row, index) => (
                                <TableRow
                                    key={row}
                                    
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.tradingNetworks[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
                <div className='mt-5 mb-5'>
                    <p className="fw-bold">Terracotta</p>
                    <Root sx={{ maxWidth: '100%', width: 600 }}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {terracotta.length>0 && terracotta.map((row, index) => (
                                <TableRow
                                    key={row}
                                    
                                    >
                                    <TableCell size='small'>{row}</TableCell>
                                    <TableCell size='small'>{resultData.terracotta[row]}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Root>
                </div>
                
            </div>
        </div>
    );
}
 
export default LicenseDetails;
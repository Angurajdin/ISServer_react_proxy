import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Axios from 'axios';


const AddProxyServer = () => {

    const [alias, setAlias] = React.useState('');
    const [host, setHost] = React.useState('');
    const [port, setPort] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [selectedValue, setSelectedValue] = React.useState('no');
    const [protocolSelectedValue, setProtocolSelectedValue] = React.useState('HTTP');
    
    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });
    const protocolControlProps = (item) => ({
        checked: protocolSelectedValue === item,
        onChange: protocolHandleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const protocolHandleChange = (event) => {
        setProtocolSelectedValue(event.target.value);
    };

    const createProxyServer = async() =>{
        await Axios.post(
            "http://localhost:5000/api/createProxy", 
            {
                "proxyAlias": alias,
                "host": host,
                "port": Number(port),
                "username": username,
                "password": password,
                "isDefault": selectedValue==="no" ? false : true,
                "protocol": protocolSelectedValue
            }
          ).then((result)=>{
            console.log(result);
          })
    }


    return ( 
       <div className="container pt-5">
           <p className="fw-bolder ps-4 pb-1">Create Proxy Server Alias</p>
           <Box component="form"
            sx={{
                '& .MuiTextField-root': { marginLeft: 5, marginBottom:2, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                required
                label="Alias"
                id="outlined-size-small"
                value={alias}
                onChange={(e) => {
                    setAlias(e.target.value);
                  }}
                size="small"
                /><br/>
                
                <TextField
                required
                label="Host Name or IP Address"
                id="outlined-size-small"
                value={host}
                onChange={(e) => {
                    setHost(e.target.value);
                  }}
                size="small"
                /><br/>
                
                <TextField
                required
                label="Port Number"
                id="outlined-size-small"
                value={port}
                onChange={(e) => {
                    setPort(e.target.value);
                  }}
                size="small"
                /><br/>
                
                <TextField
                label="User Name (optional)"
                id="outlined-size-small"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                size="small"
                /><br/>
                
                <TextField
                label="Password (optional)"
                id="outlined-size-small"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                size="small"
                /><br/>
                
                <FormLabel sx={{ marginLeft: 5 }} id="demo-row-radio-buttons-group-label" size="small">Default</FormLabel>
                <RadioGroup
                    row sx={{ marginLeft: 5 }} 
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group">
                    <FormControlLabel control={<Radio  {...controlProps('yes')} size="small" />} label="Yes" />
                    <FormControlLabel control={<Radio  {...controlProps('no')} size="small" />} label="No" />
                </RadioGroup>
                
                <FormLabel sx={{ marginLeft: 5 }} id="demo-row-radio-buttons-group-label" size="small">Protocol</FormLabel>
                <RadioGroup
                    row sx={{ marginLeft: 5 }} 
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group">
                    <FormControlLabel size="small" control={<Radio  {...protocolControlProps('HTTP')} size="small" />} label="HTTP" />
                    <FormControlLabel control={<Radio  {...protocolControlProps('HTTPS')} size="small" />} label="HTTPS" />
                    <FormControlLabel control={<Radio  {...protocolControlProps('FTP')} size="small" />} label="FTP" />
                    <FormControlLabel control={<Radio  {...protocolControlProps('SOCKS')} size="small" />} label="SOCKS" />
                </RadioGroup>

                <Box sx={{ paddingLeft: 4 }}>
                    <button type="button" onClick={createProxyServer} className="btn btn-primary btn-sm">Save Changes</button> &emsp;
                    <button type="button" className="btn btn-secondary btn-sm">Clear</button>
                </Box>
                
            </div>
            </Box>
       </div>
    );
}
 
export default AddProxyServer;
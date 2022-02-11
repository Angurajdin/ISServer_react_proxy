import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Home from '../Home';



const AddSFTP = () => {

    const [alias, setAlias] = React.useState('');
    const [host, setHost] = React.useState('');
    const [port, setPort] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const history = useHistory();

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
    

    const createProxyServer = async () => {
        try{
            await Axios.post(
                "http://localhost:5000/api/createProxy",
                {
                    "proxyAlias": alias,
                    "host": host,
                    "port": Number(port),
                    "username": username,
                    "password": password,
                    "isDefault": selectedValue === "no" ? false : true,
                    "protocol": protocolSelectedValue
                }
            ).then((result) => {
                console.log(result);
                if (result.status === 200) {
                    history.push("/proxyServer/");
                }
            })
        }
        catch(err){
            console.log("error");
            console.log(err);
        }
    }


    return (
        <div>
            <Home/>
            <div className="container pl-5 pt-3">
                <p className="fw-bolder ps-4">&nbsp;&nbsp;Create Proxy Server Alias</p>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { marginLeft: 5, marginBottom: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            label="Alias"
                            value={alias}
                            onChange={(e) => {
                                setAlias(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <TextField
                            required
                            label="Host Name or IP Address"
                            
                            value={host}
                            onChange={(e) => {
                                setHost(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <TextField
                            required
                            label="Port Number"
                            
                            value={port}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(e) => {
                                setPort(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <TextField
                            label="User Name (optional)"
                            
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <FormControl sx={{ marginLeft: 5, marginBottom:2, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password (optional)</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                size='small'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl><br/>

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
                            <button type="button" onClick={()=>{history.goBack();}} className="btn btn-danger btn-sm">
                                Back
                            </button>
                        </Box>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default AddSFTP;
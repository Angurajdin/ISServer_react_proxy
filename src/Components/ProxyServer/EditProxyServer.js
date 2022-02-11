import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Axios from 'axios';
import { useLocation, useHistory, Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Home from '../Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';



const EditProxyServer = () => {

    const location = useLocation();
    const history = useHistory();
    const [alias, setAlias] = React.useState(location.state.proxyAlias);
    const [host, setHost] = React.useState(location.state.host);
    const [port, setPort] = React.useState(location.state.port);
    const [username, setUsername] = React.useState(location.state.username);
    const [password, setPassword] = React.useState(location.state.password);
    // const [showPassword, setShowPassword] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('no');
    const [socksVersion, setSocksVersion] = React.useState('5');
    const [ftpType, setFtpType] = React.useState('0');
    const [protocolSelectedValue, setProtocolSelectedValue] = React.useState(location.state.protocol);

    React.useEffect(()=>{
        if(location.state.isDefault==true){
            setSelectedValue('yes');
        }
        else{
            setSelectedValue('no');
        }

        if("ftpType" in location.state){
            setFtpType(location.state.ftpType.toString());
        } else{
            setFtpType('');
        }

        if("socksVersion" in location.state){
            setSocksVersion(location.state.socksVersion.toString());
        } else{
            setSocksVersion('');
        }

    }, [])
    

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
    const ftpTypeControlProps = (item) => ({
        checked: ftpType === item,
        onChange: ftpTypeHandleChange,
        value: item,
        inputProps: { 'aria-label': item },
    });
    const socksVersionControlProps = (item) => ({
        checked: socksVersion === item,
        onChange: socksVersioneHandleChange,
        value: item,
        inputProps: { 'aria-label': item },
    });


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const protocolHandleChange = (event) => {
        setProtocolSelectedValue(event.target.value);
    };
    const ftpTypeHandleChange = (event) => {
        setFtpType(event.target.value);
    };
    const socksVersioneHandleChange = (event) => {
        setSocksVersion(event.target.value);
    };

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    //   };
    
    // const handleMouseDownPassword = (event) => {
    // event.preventDefault();
    // };
    

    const editProxyServer = async () => {

        let data = {
            "proxyAlias": alias,
            "host": host,
            "port": Number(port),
            "username": username,
            "password": password,
            "isDefault": selectedValue === "no" ? false : true,
            "protocol": protocolSelectedValue
        };

        if(protocolSelectedValue==="FTP")   data.ftpType = Number(ftpType);
        if(protocolSelectedValue==="SOCKS")   data.socksVersion = Number(socksVersion);

        try{
            await Axios.patch(
                "http://localhost:5000/api/editProxy",
                {
                    alias: location.state.proxyAlias,
                    formData: data
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
            <Breadcrumbs maxItems={3} sx={{ ml:12, mt:2 }} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/dashboard">
                    Administration
                </Link>
                <Link underline="hover" color="inherit" to="/proxyServer">
                    Proxy Server
                </Link>
                <Typography color="text.primary">Edit Alias</Typography>
            </Breadcrumbs>
            <div className="container pt-4">
                <p className="fw-bolder ps-4 pb-1">Edit Proxy Server Alias ( {location.state.proxyAlias} )</p>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { marginLeft: 5, marginBottom: 2, width: '25ch' },
                        marginBottom: 5
                    }}
                    noValidate
                    autoComplete="off"
                >
                        <TextField
                            required
                            label="Alias"
                            disabled
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
                            {/* <OutlinedInput
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
                            /> */}
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='password'
                                value={password}
                                label="Password"
                                size='small'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
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

                        { protocolSelectedValue==='FTP' && 
                            <div>
                                <FormLabel sx={{ marginLeft: 5 }} size="small">Proxy Type</FormLabel>
                                <RadioGroup row sx={{ marginLeft: 5 }} name="row-radio-buttons-group">
                                    <FormControlLabel control={<Radio  {...ftpTypeControlProps('0')} size="small" />} label="0. No proxy" />
                                    <FormControlLabel sx={{pl:23.3}} control={<Radio  {...ftpTypeControlProps('1')} size="small" />} label="1. ftp_user@ftp_host no proxy auth" />
                                </RadioGroup>
                                <RadioGroup row sx={{ marginLeft: 5 }} name="row-radio-buttons-group">
                                    <FormControlLabel control={<Radio  {...ftpTypeControlProps('2')} size="small" />} label="2. ftp_user@ftp_host proxy auth" />
                                    <FormControlLabel sx={{pr:0.5}} control={<Radio  {...ftpTypeControlProps('3')} size="small" />} label="3. site command" />
                                </RadioGroup>
                                <RadioGroup row sx={{ marginLeft: 5 }} name="row-radio-buttons-group">
                                    <FormControlLabel control={<Radio  {...ftpTypeControlProps('4')} size="small" />} label="4. open command" />
                                    <FormControlLabel sx={{pl:16}} control={<Radio  {...ftpTypeControlProps('5')} size="small" />} label="5. ftp_user@proxy_user@ftp_host" />
                                </RadioGroup>
                                <RadioGroup row sx={{ marginLeft: 5 }} name="row-radio-buttons-group">
                                    <FormControlLabel control={<Radio  {...ftpTypeControlProps('6')} size="small" />} label="6. proxy_user@ftp_host" />
                                    <FormControlLabel sx={{pl:9.3}} control={<Radio  {...ftpTypeControlProps('7')} size="small" />} label="7. ftp_user@ftp_host proxy_user" />
                                </RadioGroup>
                            </div>
                        }

                        { protocolSelectedValue==='SOCKS' && 
                            <div>
                                <FormLabel sx={{ marginLeft: 5 }} size="small">SOCKS Version</FormLabel>
                                <RadioGroup name="row-radio-buttons-group" row sx={{ marginLeft: 5 }}>
                                    <FormControlLabel control={<Radio  {...socksVersionControlProps('4')} size="small" />} label="SOCKS v4" />
                                    <FormControlLabel control={<Radio  {...socksVersionControlProps('5')} size="small" />} label="SOCKS v5" />
                                </RadioGroup>
                            </div>
                        }

                        <Box sx={{ paddingLeft: 4 }}>
                            <button type="button" onClick={editProxyServer} className="btn btn-primary btn-sm">Save Changes</button> &emsp;
                            <button type="button" onClick={()=>{history.goBack();}} className="btn btn-danger btn-sm">
                                Back
                            </button>
                        </Box>
                </Box>
            </div>
        </div>
    );
}

export default EditProxyServer;
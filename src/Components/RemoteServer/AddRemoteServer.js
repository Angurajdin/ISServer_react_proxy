import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Home from '../Home';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Snackbars from '../SnackBar';



const AddRemoteServer = () => {

    const [alias, setAlias] = React.useState('');
    const [host, setHost] = React.useState('');
    const [port, setPort] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [retryServer, setRetryServer] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [acl, setAcl] = React.useState('Internal');
    const [keystoreAlias, setKeystoreAlias] = React.useState('');
    const [keyAlias, setKeyAlias] = React.useState('');
    const [keepAliveConns, setKeepAliveConns] = React.useState(5);
    const [keepAliveTimeout, setKeepAliveTimeout] = React.useState(1);
    const history = useHistory();
    const [selectedValue, setSelectedValue] = React.useState('no');

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('');
    

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        inputProps: { 'aria-label': item },
    });

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
    

    const createRemoteServer = async () => {
        if(alias.includes(" ")){
            setShowSnackbar(true);
            setSnackbarMessage(`Alias Name contains illegal characters: "space" `);
            setSnackbarSeverity("warning");
            setTimeout(()=>{
            setShowSnackbar(false);
            }, 5000);
        }
        else{
            try{
                let formData;
                if(selectedValue === "yes"){
                    if(keystoreAlias==="DEFAULT_IS_KEYSTORE"){
                        formData={
                            "alias": alias,
                            "host": host,
                            "port": Number(port),
                            "user": username,
                            "pass": password,
                            "ssl": selectedValue === "no" ? false : true,
                            "acl": acl,
                            "retryServer": retryServer,
                            "keepalive": keepAliveConns,
                            "timeout": keepAliveTimeout,
                            "keyStoreAlias": keystoreAlias,
                            "keyAlias": keyAlias
                        };
                    } else{
                        formData={
                            "alias": alias,
                            "host": host,
                            "port": Number(port),
                            "user": username,
                            "pass": password,
                            "ssl": selectedValue === "no" ? false : true,
                            "acl": acl,
                            "retryServer": retryServer,
                            "keepalive": keepAliveConns,
                            "timeout": keepAliveTimeout,
                            "keyStoreAlias": keystoreAlias
                        };
                    }
                } else{
                    formData = {
                        "alias": alias,
                        "host": host,
                        "port": Number(port),
                        "user": username,
                        "pass": password,
                        "ssl": selectedValue === "no" ? false : true,
                        "acl": acl,
                        "retryServer": retryServer,
                        "keepalive": keepAliveConns,
                        "timeout": keepAliveTimeout
                    }
                }
                await Axios.post(
                    "http://localhost:5000/api/createRemote",
                    formData
                ).then((result) => {
                    console.log(result);
                    if (result.status === 200) {
                        history.push("/remoteServer/");
                    } else{
                        console.log("error = ", result);
                    }
                })
            }
            catch(err){
                console.log("error");
                console.log(err);
            }
        }
    }


    return (
        <div>
            <Home/>
            <Breadcrumbs maxItems={3} sx={{ ml:12, mt:2 }} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/dashboard">
                    Administration
                </Link>
                <Link underline="hover" color="inherit" to="/remoteServer">
                    Remote Server
                </Link>
                <Typography color="text.primary">Create Alias</Typography>
            </Breadcrumbs>
            <div className="container pl-5 pt-3">
                {showSnackbar && <Snackbars message={snackbarMessage} severity={snackbarSeverity} />}
                <p className="fw-bolder ps-4">&nbsp;&nbsp;Create Remote Server Alias</p>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { marginLeft: 5, marginBottom: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='pb-5'>
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
                            label="User Name *"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <FormControl sx={{ marginLeft: 5, marginBottom:2, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
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

                        <FormControl sx={{ marginLeft: 5, marginBottom:2, width: '25ch' }}>
                            <InputLabel>Execute ACL</InputLabel>
                            <Select
                            size='small'
                            value={acl}
                            label="Execute ACL"
                            onChange={(event) => setAcl(event.target.value) } >
                                <MenuItem value={"Administrator"}>Administrator</MenuItem>
                                <MenuItem value={"Anonymous"}>Anonymous</MenuItem>
                                <MenuItem value={"Default"}>Default</MenuItem>
                                <MenuItem value={"Developers"}>Developers</MenuItem>
                                <MenuItem value={"Internal"}>Internal</MenuItem>
                                <MenuItem value={"Monitor Administrator"}>Monitor Administrator</MenuItem>
                                <MenuItem value={"Montior Users"}>Montior Users</MenuItem>
                                <MenuItem value={"Replicators"}>Replicators</MenuItem>
                            </Select>
                        </FormControl><br/>

                        <TextField
                            required
                            label="Max Keep Alive Connections"
                            value={keepAliveConns}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(e) => {
                                setKeepAliveConns(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <TextField
                            required
                            label="Keep Alive Timeout (minutes)"
                            value={keepAliveTimeout}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={(e) => {
                                setKeepAliveTimeout(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <FormLabel sx={{ marginLeft: 5 }} size="small">Use SSL</FormLabel>
                        <RadioGroup row sx={{ marginLeft: 5, paddingBottom: 1 }}>
                            <FormControlLabel control={<Radio  {...controlProps('yes')} size="small" />} label="Yes" />
                            <FormControlLabel control={<Radio  {...controlProps('no')} size="small" />} label="No" />
                        </RadioGroup>

                        { selectedValue==="yes" && 

                        <FormControl sx={{ marginLeft: 5, marginBottom:2, width: '25ch' }}>
                            <InputLabel>Keystore Alias (optional)</InputLabel>
                            <Select
                            size='small'
                            value={keystoreAlias}
                            label="Keystore Alias (optional)"
                            onChange={  (event) => {
                                setKeystoreAlias(event.target.value); 
                                if(event.target.value!=="")
                                {
                                    setKeyAlias("ssos"); 
                                } else{
                                    setKeyAlias("");
                                }
                            } } >
                                <MenuItem value={""}>None</MenuItem>
                                <MenuItem value={"DEFAULT_IS_KEYSTORE"}>DEFAULT_IS_KEYSTORE</MenuItem>
                            </Select>
                        </FormControl>
                        }

                        { selectedValue==="yes" && <br/>}

                        { selectedValue==="yes" && 
                        <FormControl sx={{ marginLeft: 5, marginBottom:2, width: '25ch' }}>
                            <InputLabel>Key Alias (optional)</InputLabel>
                            <Select
                            size='small'
                            value={keyAlias}
                            label="Key Alias (optional)"
                            onChange={(event) => setKeyAlias(event.target.value) } >
                                {keystoreAlias==="DEFAULT_IS_KEYSTORE" && <MenuItem value={"ssos"}>ssos</MenuItem>}
                            </Select>
                        </FormControl>
                        }

                        { selectedValue==="yes" && <br/>}

                        <TextField
                            label="Retry Server"
                            value={retryServer}
                            onChange={(e) => {
                                setRetryServer(e.target.value);
                            }}
                            size="small"
                        /><br />

                        <Box sx={{ paddingLeft: 4 }}>
                            <button type="button" onClick={createRemoteServer} className="btn btn-primary btn-sm">Save Changes</button> &emsp;
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

export default AddRemoteServer;
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Home from '../../Home';
import { Breadcrumbs } from '@mui/material';
import { useHistory, Link, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Axios from 'axios';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';



const EditSFTPUser = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [alias, setAlias] = React.useState(location.state.alias);
    const [username, setUsername] = React.useState(location.state.userName);
    const [password, setPassword] = React.useState('');
    const [retypePassword, setRetypePassword] = React.useState('');
    const [privateKeyLocation, setPrivateKeyLocation] = React.useState('');
    const [passPhrase, setPassPhrase] = React.useState('');
    const [retypePassPhrase, setRetypePassPhrase] = React.useState('');
    const [serverAlias, setServerAlias] = React.useState(location.state.sftpServerAlias);
    const [SFTPServers, setSFTPServers] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState(location.state.authenticationType);
    const [selectedValueHostKey, setSelectedValueHostKey] = React.useState(location.state.strictHostKeyChecking);
    const [compression, setCompression] = React.useState(location.state.compression);
    const [maximumRetries, setMaximumRetries] = React.useState('');
    const [connectionTimeout, setConnectionTimeout] = React.useState('');
    const [sessionTimeout, setSessionTimeout] = React.useState('');
    const [compressionLevel, setCompressionLevel] = React.useState('');
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);

    React.useEffect(async () => {
        await Axios(
            "http://localhost:5000/api/getSftpServer", {
            method: 'GET',
        }).then((result) => {
            let server = [];
            for (let row of result.data.sftpServerAliases) {
                server.push(row.alias);
            }
            setSFTPServers(server);
        })

        if (location.state.hasOwnProperty("maximumRetries")) {
            setMaximumRetries(location.state.maximumRetries);
        }
        if (location.state.hasOwnProperty("connectionTimeout")) {
            setConnectionTimeout(location.state.connectionTimeout);
        }
        if (location.state.hasOwnProperty("sessionTimeout")) {
            setSessionTimeout(location.state.sessionTimeout);
        }
        if (location.state.hasOwnProperty("compressionLevel")) {
            setCompressionLevel(location.state.compressionLevel);
        }

    }, []);

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const controlPropsHostKey = (item) => ({
        checked: selectedValueHostKey === item,
        onChange: handleChangeHostKey,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const handleChangeHostKey = (event) => {
        setSelectedValueHostKey(event.target.value);
    }


    const editSFTPUserAlias = async () => {

        setLoadingSubmit(true);

        try {
            setLoadingSubmit(true);
            let SFTPUserAlias = {
                "alias": alias,
                "authenticationType": selectedValue,
                "sftpServerAlias": serverAlias,
                "userName": username,
                "strictHostKeyChecking": selectedValueHostKey,
                "compression": compression
            };

            if (selectedValue === "password") {
                if (password.trim() !== "" || retypePassword.trim() !== "") {
                    if (password === retypePassword)
                        SFTPUserAlias["password"] = password;
                    else {
                        alert("Your password and Retype password do not match.");
                        throw "exit";
                    }
                } else {
                    alert("password and Retype password field must not be empty");
                    throw "exit";
                }
            } else {
                if (passPhrase.trim() !== "" || retypePassPhrase.trim() !== "") {
                    if (passPhrase === retypePassPhrase) {
                        SFTPUserAlias["passPhrase"] = passPhrase;
                        SFTPUserAlias["privateKeyFileLocation"] = privateKeyLocation;
                    }
                    else {
                        alert("Your passPharse and Retype passPharse do not match.");
                        throw "exit";
                    }
                } else {
                    alert("passPhrase and Retype passPhrase field must not be empty");
                    throw "exit";
                }
            }

            if (maximumRetries.toString().trim() !== "") {
                if(maximumRetries < 7 && maximumRetries > 0 ){
                    SFTPUserAlias["maximumRetries"] = Number(maximumRetries);
                }
                else{
                    alert("Specify a valid positive integer for the field : 'Maximum Retries', The valid values must be between 1 and 6.");
                    throw "exit";
                }
            }

            if (connectionTimeout.toString().trim() !== "") {
                SFTPUserAlias["connectionTimeout"] = Number(connectionTimeout);
            }

            if (sessionTimeout.toString().trim() !== "") {
                SFTPUserAlias["sessionTimeout"] = Number(sessionTimeout);
            }

            if (compressionLevel.toString().trim() !== "") {
                SFTPUserAlias["compressionLevel"] = Number(compressionLevel);
            }
            
            if (serverAlias === "") {
                alert("Please, Select the Server Alias to create a new User Alias");
            }

            if (serverAlias !== "" && (SFTPUserAlias.hasOwnProperty("passPhrase") || SFTPUserAlias.hasOwnProperty("password"))) {
                await Axios.patch(
                    "http://localhost:5000/api/editSFTPUser",
                    {
                        "alias": location.state.alias,
                        "formData": SFTPUserAlias
                    }
                ).then((result) => {
                    console.log(result);
                    setLoadingSubmit(false);
                    if (result.status === 200) {
                        history.push("/SFTP/UserAlias");
                    }
                })
            } else {
                setLoadingSubmit(false);
            }

        }
        catch (err) {
            setLoadingSubmit(false);
            console.log("error");
            console.log(err);
        }
    }



    return (
        <div>
            <Home />
            <Breadcrumbs maxItems={3} sx={{ ml: 12, mt: 2 }} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/dashboard">
                    Administration
                </Link>
                <Link underline="hover" color="inherit" to="/SFTP/UserAlias">
                    SFTP User Alias
                </Link>
                <Typography color="text.primary">Create User Alias</Typography>
            </Breadcrumbs>

            <div className="container pl-5 pt-3">
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { marginLeft: 5, marginBottom: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography sx={{ pt: 3, fontWeight: 'bold' }} variant="h6" gutterBottom component="div">
                        Create User Alias
                    </Typography>
                    <TextField
                        required
                        sx={{ mb: 2 }}
                        disabled
                        label="Alias"
                        value={alias}
                        onChange={(e) => {
                            setAlias(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <TextField
                        required
                        sx={{ mb: 2 }}
                        disabled
                        label="User Name"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <Typography sx={{ ml: 5, fontWeight: 'bold', fontSize: 20 }} variant="caption" gutterBottom component="div">
                        Authentication Type
                    </Typography>
                    <RadioGroup
                        row sx={{ marginLeft: 8, pb: 2 }}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group">
                        <FormControlLabel control={<Radio  {...controlProps('password')} size="small" />} label="Password" />
                        <FormControlLabel control={<Radio  {...controlProps('publicKey')} size="small" />} label="Public Key" />
                    </RadioGroup>

                    {
                        selectedValue === "password" &&
                        <div>
                            <TextField
                                required
                                sx={{ mb: 2 }}
                                label="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                size="small"
                            /><br />
                            <TextField
                                required
                                sx={{ mb: 2 }}
                                label="ReType Password"
                                value={retypePassword}
                                onChange={(e) => {
                                    setRetypePassword(e.target.value);
                                }}
                                size="small"
                            /><br />
                        </div>
                    }

                    {
                        selectedValue === "publicKey" &&
                        <div>
                            <TextField
                                required
                                sx={{ mb: 2 }}
                                label="Private Key Location"
                                value={privateKeyLocation}
                                onChange={(e) => {
                                    setPrivateKeyLocation(e.target.value);
                                }}
                                size="small"
                            /><br />

                            <TextField
                                required
                                sx={{ mb: 2 }}
                                label="PassPhrase"
                                value={passPhrase}
                                onChange={(e) => {
                                    setPassPhrase(e.target.value);
                                }}
                                size="small"
                            /><br />
                            <TextField
                                required
                                sx={{ mb: 2 }}
                                label="Re-type PassPhrase"
                                value={retypePassPhrase}
                                onChange={(e) => {
                                    setRetypePassPhrase(e.target.value);
                                }}
                                size="small"
                            /><br />
                        </div>
                    }

                    <FormControl sx={{ ml: 5, marginBottom: 2, width: '25ch' }}>
                        <InputLabel>SFTP Server Alias</InputLabel>
                        <Select
                            size='small'
                            value={serverAlias}
                            label="SFTP Server Alias"
                            onChange={(event) => setServerAlias(event.target.value)} >
                            <MenuItem key="none" value="">None</MenuItem>
                            {
                                SFTPServers.length && console.log(SFTPServers),
                                SFTPServers.map((row, index) => {
                                    return (
                                        <MenuItem key={index} value={row}>{row}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl><br />

                    <Divider variant='middle' />
                    <Typography sx={{ pl: 2, pt: 3, pb: 2, fontWeight: 'bold' }} variant="body1" gutterBottom component="div">
                        SFTP User Alias Advanced Settings (Optional)
                    </Typography>

                    <TextField
                        sx={{ mb: 2 }}
                        label="Maximum Retries"
                        value={maximumRetries}
                        onChange={(e) => {
                            setMaximumRetries(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <TextField
                        sx={{ mb: 2 }}
                        label="Connection Timeout (Seconds)"
                        value={connectionTimeout}
                        onChange={(e) => {
                            setConnectionTimeout(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <TextField
                        sx={{ mb: 2 }}
                        label="Session Timeout (Minutes)"
                        value={sessionTimeout}
                        onChange={(e) => {
                            setSessionTimeout(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <Typography sx={{ ml: 5, fontWeight: 'bold', fontSize: 20 }} variant="caption" gutterBottom component="div">
                        Strict Host Key Checking
                    </Typography>
                    <RadioGroup
                        row sx={{ marginLeft: 10, pb: 2 }}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group">
                        <FormControlLabel control={<Radio  {...controlPropsHostKey('yes')} size="small" />} label="Yes" />
                        <FormControlLabel control={<Radio  {...controlPropsHostKey('no')} size="small" />} label="No" />
                    </RadioGroup>

                    <FormControl sx={{ ml: 5, marginBottom: 2, width: '25ch' }}>
                        <InputLabel>Compression</InputLabel>
                        <Select
                            size='small'
                            value={compression}
                            label="Compression"
                            onChange={(event) => setCompression(event.target.value)} >
                            <MenuItem key="none" value="none">none</MenuItem>
                            <MenuItem key="zlib" value="zlib">zlib</MenuItem>
                        </Select>
                    </FormControl><br />

                    <TextField
                        sx={{ mb: 2 }}
                        label="Compression Level"
                        disabled={compression === 'none'}
                        value={compressionLevel}
                        onChange={(e) => {
                            setCompressionLevel(e.target.value);
                        }}
                        size="small"
                    /><br />

                    <Box sx={{ pl: 5, py: 5 }}>
                        <LoadingButton
                            style={{ textTransform: 'none' }}
                            sx={{ px: 1, pl: 2 }}
                            color="primary"
                            onClick={editSFTPUserAlias}
                            loading={loadingSubmit}
                            // size="small"
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Save Changes
                        </LoadingButton>
                        &emsp;
                        <Button color="error" onClick={() => { history.goBack(); }} style={{ textTransform: 'none' }} variant="contained">Back</Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default EditSFTPUser;
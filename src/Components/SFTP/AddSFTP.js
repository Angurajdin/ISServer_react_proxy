import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Home from '../Home';
import LoadingButton from '@mui/lab/LoadingButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TransferList from '../TransderList';
import { useCallback } from 'react';
import Divider from '@mui/material/Divider';
import { Breadcrumbs } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';


const AddSFTP = () => {

    const keyExchangeAlgorithmsValuesv2 = ["diffie-hellman-group-exchange-sha256", "curve25519-sha256@libssh.org", "diffie-hellman-group18-sha512", "diffie-hellman-group17-sha512", "diffie-hellman-group16-sha512", "diffie-hellman-group15-sha512", "diffie-hellman-group14-sha256",
    "diffie-hellman-group-exchange-sha1", "diffie-hellman-group14-sha1", "ecdh-sha2-nistp256", "ecdh-sha2-nistp384", "ecdh-sha2-nistp521",
    "diffie-hellman-group1-sha1", "rsa2048-sha256", "rsa1024-sha1"];

    const MACAlgorithmsS2CValuesv2 = ["hmac-sha2-256", "hmac-sha256","hmac-sha256@ssh.com","hmac-sha2-256-etm@openssh.com","hmac-sha2-256-96",
    "hmac-sha512","hmac-sha2-512","hmac-sha512@ssh.com","hmac-sha2-512-etm@openssh.com","hmac-sha2-512-96", "hmac-sha1", "hmac-sha1-etm@openssh.com", 
    "hmac-sha1-96", "hmac-ripemd160", "hmac-ripemd160@openssh.com", "hmac-ripemd160-etm@openssh.com", "hmac-md5", "hmac-md5-etm@openssh.com", "hmac-md5-96"];
    
    const MACAlgorithmsC2SValuesv2 = ["hmac-sha2-256", "hmac-sha256","hmac-sha256@ssh.com","hmac-sha2-256-etm@openssh.com","hmac-sha2-256-96",
    "hmac-sha512","hmac-sha2-512","hmac-sha512@ssh.com","hmac-sha2-512-etm@openssh.com","hmac-sha2-512-96", "hmac-sha1", "hmac-sha1-etm@openssh.com", 
    "hmac-sha1-96", "hmac-ripemd160", "hmac-ripemd160@openssh.com", "hmac-ripemd160-etm@openssh.com", "hmac-md5", "hmac-md5-etm@openssh.com", "hmac-md5-96"];

    const keyExchangeAlgorithmsValuesv1 = ["ecdh-sha2-nistp256", "ecdh-sha2-nistp384", "ecdh-sha2-nistp521",
    "diffie-hellman-group14-sha1","diffie-hellman-group-exchange-sha256","diffie-hellman-group-exchange-sha1","diffie-hellman-group1-sha1"];
    const MACAlgorithmsS2CValuesv1 = ["hmac-md5","hmac-sha1","hmac-sha2-256","hmac-sha1-96", "hmac-md5-96"];
    const MACAlgorithmsC2SValuesv1 = ["hmac-md5","hmac-sha1","hmac-sha2-256","hmac-sha1-96", "hmac-md5-96"];



    const CiphersS2CValues = ["aes128-ctr","aes192-ctr","aes256-ctr","3des-ctr","3des-cbc","blowfish-cbc","aes128-cbc","aes192-cbc","aes256-cbc","arcfour",
    "arcfour128", "arcfour256", "aes128-gcm@openssh.com", "aes256-gcm@openssh.com"];
    
    const CiphersC2SValues = ["aes128-ctr","aes192-ctr","aes256-ctr","3des-ctr","3des-cbc","blowfish-cbc","aes128-cbc","aes192-cbc","aes256-cbc","arcfour",
    "arcfour128", "arcfour256", "aes128-gcm@openssh.com", "aes256-gcm@openssh.com"];
    

    const [alias, setAlias] = React.useState('');
    const [host, setHost] = React.useState('');
    const [hostKey, setHostKey] = React.useState('');
    const [port, setPort] = React.useState('');
    const [proxyAlias, setProxyAlias] = React.useState('');
    const [proxyServers, setProxyServers] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState('v2');
    const [maxDHKeySize, setMaxDHKeySize] = React.useState('8192');
    const [minDHKeySize, setMinDHKeySize] = React.useState('1024');
    const [loading, setLoading] = React.useState(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);
    const history = useHistory();

    const [keyExchangeAlgorithms, setKeyExchangeAlgorithms] = React.useState(keyExchangeAlgorithmsValuesv2);
    const [MACAlgorithmsS2C, setMACAlgorithmsS2C] = React.useState(MACAlgorithmsS2CValuesv2);
    const [MACAlgorithmsC2S, setMACAlgorithmsC2S] = React.useState(MACAlgorithmsC2SValuesv2);
    const [CiphersS2C, setCiphersS2C] = React.useState(CiphersS2CValues);
    const [CiphersC2S, setCiphersC2S] = React.useState(CiphersC2SValues);
   

    React.useEffect(async () => {
        await Axios(
            "http://localhost:5000/api/getProxy", {
            method: 'GET',
        }).then((result) => {
            let server = [];
            for (let row of result.data.proxies) {
                server.push(row.proxyAlias);
            }
            setProxyServers(server);
        })
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
        if(event.target.value==="v1"){
            setKeyExchangeAlgorithms(keyExchangeAlgorithmsValuesv1);
            setMACAlgorithmsS2C(MACAlgorithmsS2CValuesv1);
            setMACAlgorithmsC2S(MACAlgorithmsC2SValuesv1);
        } else{
            setKeyExchangeAlgorithms(keyExchangeAlgorithmsValuesv2);
            setMACAlgorithmsS2C(MACAlgorithmsS2CValuesv2);
            setMACAlgorithmsC2S(MACAlgorithmsC2SValuesv2);
        }
    };

    function getHostKey() {
        setLoading(true);
    }

    const createSFTPServer = async () => {
        try {
            setLoadingSubmit(true);
            let SFTPServer = {
                "alias": alias,
                "version": selectedValue,
                "hostName": host,
                "port": Number(port)
            };

            if(selectedValue === "v2"){
                SFTPServer["minDHKeySize"] = Number(minDHKeySize);
                SFTPServer["maxDHKeySize"] = Number(maxDHKeySize);
            }
            if(keyExchangeAlgorithms.length > 0)    SFTPServer["preferredKeyExchangeAlgorithm"] = keyExchangeAlgorithms;
            if(MACAlgorithmsS2C.length > 0)         SFTPServer["preferredMACS2C"] = MACAlgorithmsS2C;
            if(MACAlgorithmsC2S.length > 0)         SFTPServer["preferredMACC2S"] = MACAlgorithmsC2S;
            if(CiphersS2C.length > 0)               SFTPServer["preferredCiphersS2C"] = CiphersS2C;
            if(CiphersC2S.length > 0)               SFTPServer["preferredCiphersC2S"] = CiphersC2S;

            await Axios.post(
                "http://localhost:5000/api/createSFTP",
                SFTPServer
            ).then((result) => {
                console.log(result);
                setLoadingSubmit(false);
                if (result.status === 200) {
                    history.push("/SFTP/");
                }
            })
        }
        catch (err) {
            console.log("error");
            console.log(err);
        }
    }

    const getKeyExchangeAlgorithms = useCallback((value) =>{
        setKeyExchangeAlgorithms(value);
    }, []);

    const getMACAlgorithmsS2C = useCallback((value) =>{
        setMACAlgorithmsS2C(value);
    }, []);

    const getMACAlgorithmsC2S = useCallback((value) =>{
        setMACAlgorithmsC2S(value);
    }, []);

    const getCiphersS2C = useCallback((value) =>{
        setCiphersS2C(value);
    }, []);

    const getCiphersC2S = useCallback((value) =>{
        setCiphersC2S(value);
    }, []);

    return (
        <div>
            <Home />
            <Breadcrumbs maxItems={3} sx={{ ml:12, mt:2 }} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/dashboard">
                    Administration
                </Link>
                <Link underline="hover" color="inherit" to="/SFTP/">
                    SFTP
                </Link>
                <Typography color="text.primary">Create Alias</Typography>
            </Breadcrumbs>
            <div className="container pl-5 pt-3">
                <Typography sx={{ pl: 4, pt: 3, fontWeight: 'bold' }} variant="h6" gutterBottom component="div">
                    Create SFTP Server Alias
                </Typography>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { marginLeft: 5, marginBottom: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Typography sx={{ pl: 5, pt: 3, fontWeight: 'bold', fontSize: 20 }} variant="caption" gutterBottom component="div">
                            SFTP Client Version
                        </Typography>
                        <RadioGroup
                            row sx={{ marginLeft: 5, pb: 1 }}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group">
                            <FormControlLabel control={<Radio  {...controlProps('v1')} size="small" />} label="Version 1" />
                            <FormControlLabel control={<Radio  {...controlProps('v2')} size="small" />} label="Version 2" />
                        </RadioGroup>

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

                        <FormControl sx={{ marginLeft: 5, marginBottom: 2, width: '25ch' }}>
                            <InputLabel>Proxy Alias</InputLabel>
                            <Select
                                size='small'
                                value={proxyAlias}
                                label="Proxy Alias"
                                onChange={(event) => setProxyAlias(event.target.value)} >
                                {
                                    proxyServers.length &&
                                    proxyServers.map((row, index) => {
                                        return (
                                            <MenuItem key={index} value={row}>{row}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl><br />

                        <TextField
                            required
                            label="Host Key Location"
                            value={hostKey}
                            onChange={(e) => {
                                setHostKey(e.target.value);
                            }}
                            size="small"
                        /> &emsp;

                        <LoadingButton
                            style={{ textTransform: 'none' }}
                            sx={{ px: 1 }}
                            color="primary"
                            onClick={getHostKey}
                            loading={loading}
                            // size="small"
                            loadingPosition="start"
                            startIcon={<GetAppIcon />}
                            variant="contained"
                        >
                            Get Host Key
                        </LoadingButton><br />

                        <Divider variant='middle' />

                        <Typography sx={{ pl: 5, pt: 3, pb: 2, fontWeight: 'bold' }} variant="body1" gutterBottom component="div">
                            SFTP Server Alias Advanced Settings (Optional)
                        </Typography>

                        { selectedValue==="v2" && 
                            <div>
                                <TextField
                                    required
                                    label="Min DH Key Size"
                                    value={minDHKeySize}
                                    onChange={(e) => {
                                        setMinDHKeySize(e.target.value);
                                    }}
                                    size="small"
                                /><br />

                                <TextField
                                    required
                                    label="Max DH Key Size"
                                    value={maxDHKeySize}
                                    onChange={(e) => {
                                        setMaxDHKeySize(e.target.value);
                                    }}
                                    size="small"
                                /><br />
                                <TransferList getValue={getKeyExchangeAlgorithms} left={keyExchangeAlgorithmsValuesv2} right={[]} title=" Key Exchange Algorithms" />

                                <TransferList getValue={getMACAlgorithmsS2C} left={MACAlgorithmsS2CValuesv2} right={[]} title=" MAC Algorithms S2C" />

                                <TransferList getValue={getMACAlgorithmsC2S} left={MACAlgorithmsC2SValuesv2} right={[]} title=" MAC Algorithms C2S" />
                                
                                <TransferList getValue={getCiphersS2C} left={CiphersS2CValues} right={[]} title=" Ciphers S2C" />
                                <TransferList getValue={getCiphersC2S} left={CiphersC2SValues} right={[]} title=" Ciphers C2S" />

                            </div>
                        }

                        {
                            selectedValue==='v1' && 
                            <div>
                                <TransferList getValue={getKeyExchangeAlgorithms} left={keyExchangeAlgorithmsValuesv1} right={[]} title=" Key Exchange Algorithms" />
                                <TransferList getValue={getMACAlgorithmsS2C} left={MACAlgorithmsS2CValuesv1} right={[]} title=" MAC Algorithms S2C" />
                                <TransferList getValue={getMACAlgorithmsC2S} left={MACAlgorithmsC2SValuesv1} right={[]} title=" MAC Algorithms C2S" />
                                <TransferList getValue={getCiphersS2C} left={CiphersS2CValues} right={[]} title=" Ciphers S2C" />
                                <TransferList getValue={getCiphersC2S} left={CiphersC2SValues} right={[]} title=" Ciphers C2S" />
                            </div>
                        }

                        <Box sx={{ pl: 5, py: 5 }}>
                            <LoadingButton
                                style={{ textTransform: 'none' }}
                                sx={{ px: 1, pl: 2 }}
                                color="primary"
                                onClick={createSFTPServer}
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
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default AddSFTP;
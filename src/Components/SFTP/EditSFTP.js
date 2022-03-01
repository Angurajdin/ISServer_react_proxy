import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Axios from 'axios';
import { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from 'react-router-dom';
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


const EditSFTP = (props) => {

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
    

    const history = useHistory();
    const location = useLocation();
    const alias = location.state.alias;
    const [host, setHost] = React.useState(location.state.hostName);
    const [hostKey, setHostKey] = React.useState(location.state.hostKeyLocation);
    const [port, setPort] = React.useState(location.state.port);
    const [proxyAlias, setProxyAlias] = React.useState(location.state.proxyAlias);
    const proxyServers = location.state.proxyServers;
    const selectedValue = location.state.version;
    const [maxDHKeySize, setMaxDHKeySize] = React.useState(location.state.maxDHKeySize);
    const [minDHKeySize, setMinDHKeySize] = React.useState(location.state.minDHKeySize);
    const [loading, setLoading] = React.useState(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState(false);

    let keyExchangeAlgorithms = location.state?.preferredKeyExchangeAlgorithm;
    let MACAlgorithmsS2C = location.state.preferredMACS2C;
    let MACAlgorithmsC2S = location.state.preferredMACC2S;
    let CiphersS2C = location.state.preferredCiphersS2C;
    let CiphersC2S = location.state.preferredCiphersC2S;

    // [
    //     "alias",
    //     "version",
    //     "hostName",
    //     "port",
    //     "preferredKeyExchangeAlgorithm",
    //     "proxyAlias",
    //     "preferredMACS2C",
    //     "preferredMACC2S",
    //     "preferredCiphersS2C",
    //     "preferredCiphersC2S",
    //     "minDHKeySize",
    //     "maxDHKeySize",
    //     "fingerprint",
    //     "hostKeyLocation",
    //     "proxyServers"
    // ]

    function getHostKey() {
        setLoading(true);
    }

    const editSFTPServer = async () => {
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
            if(keyExchangeAlgorithms.length > 0){
                SFTPServer["preferredKeyExchangeAlgorithm"] = keyExchangeAlgorithms;
            }
            if(MACAlgorithmsS2C.length > 0)         SFTPServer["preferredMACS2C"] = MACAlgorithmsS2C;
            if(MACAlgorithmsC2S.length > 0)         SFTPServer["preferredMACC2S"] = MACAlgorithmsC2S;
            if(CiphersS2C.length > 0)               SFTPServer["preferredCiphersS2C"] = CiphersS2C;
            if(CiphersC2S.length > 0)               SFTPServer["preferredCiphersC2S"] = CiphersC2S;

            // console.log(keyExchangeAlgorithms.length, MACAlgorithmsS2C.length, MACAlgorithmsC2S.length, CiphersS2C.length, CiphersC2S.length);

            await Axios.patch(
                "http://localhost:5000/api/editSFTP",
                {
                    "alias": location.state.alias,
                    "formData": SFTPServer 
                },
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

    const controlProps = (item) => ({
        checked: selectedValue === item,
        // onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    // const handleChange = (event) => {
    //     setSelectedValue(event.target.value);
    // };

    const getKeyExchangeAlgorithms = useCallback((value) =>{
        keyExchangeAlgorithms = value;
    }, []);

    const getMACAlgorithmsS2C = useCallback((value) =>{
        MACAlgorithmsS2C = value;
    }, []);

    const getMACAlgorithmsC2S = useCallback((value) =>{
        MACAlgorithmsC2S = value;
    }, []);

    const getCiphersS2C = useCallback((value) =>{
        CiphersS2C = value;
    }, []);

    const getCiphersC2S = useCallback((value) =>{
        CiphersC2S = value;
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
                <Typography color="text.primary">Edit Alias</Typography>
            </Breadcrumbs>
            <div className="container pl-5 pt-3">
                <Typography sx={{ pl: 4, pt: 3, fontWeight: 'bold' }} variant="h6" gutterBottom component="div">
                    Edit SFTP Server Alias
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
                            <FormControlLabel control={<Radio {...controlProps('v1')} disabled size="small" />} label="Version 1" />
                            <FormControlLabel control={<Radio {...controlProps('v2')} disabled size="small" />} label="Version 2" />
                        </RadioGroup>

                        <TextField
                            required
                            label="Alias"
                            disabled
                            value={alias}
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
                                    <MenuItem value={""}>None</MenuItem>
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
                            label="Host Key Fingerprint"
                            disabled
                            value={location.state.fingerprint}
                            size="small"
                        /><br />

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
                                    {
                                    location.state.hasOwnProperty('preferredKeyExchangeAlgorithm') ?
                                        <TransferList getValue={getKeyExchangeAlgorithms} left={location.state.preferredKeyExchangeAlgorithm} right={keyExchangeAlgorithmsValuesv2.filter(x => !location.state.preferredKeyExchangeAlgorithm.includes(x))} title=" Key Exchange Algorithms" />
                                        : <TransferList getValue={getKeyExchangeAlgorithms} left={keyExchangeAlgorithmsValuesv2} right={[]} title=" Key Exchange Algorithms" />}
                                    {
                                    location.state.hasOwnProperty('preferredMACS2C') ?
                                        <TransferList getValue={getMACAlgorithmsS2C} left={location.state.preferredMACS2C} right={MACAlgorithmsS2CValuesv2.filter(x => !location.state.preferredMACS2C.includes(x))} title=" MAC Algorithms S2C" />
                                        : <TransferList getValue={getMACAlgorithmsS2C} left={MACAlgorithmsS2CValuesv2} right={[]} title=" MAC Algorithms S2C" />}
                                    {
                                    location.state.hasOwnProperty('preferredMACC2S') ?
                                        <TransferList getValue={getMACAlgorithmsC2S} left={location.state.preferredMACC2S} right={MACAlgorithmsC2SValuesv2.filter(x => !location.state.preferredMACC2S.includes(x))} title=" MAC Algorithms C2S" />
                                        : <TransferList getValue={getMACAlgorithmsC2S} left={MACAlgorithmsC2SValuesv2} right={[]} title=" MAC Algorithms C2S" />}
                                    {
                                    location.state.hasOwnProperty('preferredCiphersS2C') ?
                                    <TransferList getValue={getCiphersS2C} left={location.state.preferredCiphersS2C} right={CiphersS2CValues.filter(x => !location.state.preferredCiphersS2C.includes(x))} title=" Ciphers S2C" />
                                        : <TransferList getValue={getCiphersS2C} left={CiphersS2CValues} right={[]} title=" Ciphers S2C" />}
                                    {
                                    location.state.hasOwnProperty('preferredCiphersC2S') ?
                                    <TransferList getValue={getCiphersC2S} left={location.state.preferredCiphersC2S} right={CiphersC2SValues.filter(x => !location.state.preferredCiphersC2S.includes(x))} title=" Ciphers C2S" />
                                        : <TransferList getValue={getCiphersC2S} left={CiphersC2SValues} right={[]} title=" Ciphers C2S" />
                                    }
                            </div>
                        }

                        {
                            selectedValue==='v1' && 
                            <div>
                                {
                                    location.state.hasOwnProperty('preferredKeyExchangeAlgorithm') ?
                                        <TransferList getValue={getKeyExchangeAlgorithms} left={location.state.preferredKeyExchangeAlgorithm} right={keyExchangeAlgorithmsValuesv1.filter(x => !location.state?.preferredKeyExchangeAlgorithm.includes(x))} title=" Key Exchange Algorithms" />
                                        : <TransferList getValue={getKeyExchangeAlgorithms} left={keyExchangeAlgorithmsValuesv1} right={[]} title=" Key Exchange Algorithms" />}
                                    {
                                    location.state.hasOwnProperty('preferredMACS2C') ?
                                        <TransferList getValue={getMACAlgorithmsS2C} left={location.state.preferredMACS2C} right={MACAlgorithmsS2CValuesv1.filter(x => !location.state.preferredMACS2C.includes(x))} title=" MAC Algorithms S2C" />
                                        : <TransferList getValue={getMACAlgorithmsS2C} left={MACAlgorithmsS2CValuesv1} right={[]} title=" MAC Algorithms S2C" />}
                                    {
                                    location.state.hasOwnProperty('preferredMACC2S') ?
                                        <TransferList getValue={getMACAlgorithmsC2S} left={location.state.preferredMACC2S} right={MACAlgorithmsC2SValuesv1.filter(x => !location.state.preferredMACC2S.includes(x))} title=" MAC Algorithms C2S" />
                                        : <TransferList getValue={getMACAlgorithmsC2S} left={MACAlgorithmsC2SValuesv1} right={[]} title=" MAC Algorithms C2S" />}
                                    {
                                    location.state.hasOwnProperty('preferredCiphersS2C') ?
                                    <TransferList getValue={getCiphersS2C} left={location.state.preferredCiphersS2C} right={CiphersS2CValues.filter(x => !location.state.preferredCiphersS2C.includes(x))} title=" Ciphers S2C" />
                                        : <TransferList getValue={getCiphersS2C} left={CiphersS2CValues} right={[]} title=" Ciphers S2C" />}
                                    {
                                    location.state.hasOwnProperty('preferredCiphersC2S') ?
                                    <TransferList getValue={getCiphersC2S} left={location.state.preferredCiphersC2S} right={CiphersC2SValues.filter(x => !location.state.preferredCiphersC2S.includes(x))} title=" Ciphers C2S" />
                                        : <TransferList getValue={getCiphersC2S} left={CiphersC2SValues} right={[]} title=" Ciphers C2S" />
                                    }
                            </div>
                        }

                        <Box sx={{ pl: 5, py: 5 }}>
                            <LoadingButton
                                style={{ textTransform: 'none' }}
                                sx={{ px: 1, pl: 2 }}
                                color="primary"
                                onClick={editSFTPServer}
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

export default EditSFTP;
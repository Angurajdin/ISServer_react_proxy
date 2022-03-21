import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import Home from "../Home";
import Axios from 'axios';
import { Typography } from '@mui/material';

const Overview = () => {

    useEffect(async()=>{
        await Axios.get(
            "http://localhost:5000/api/dashboard/overview"
        ).then((result)=>{
            console.log(result);
          })
    }, [])


    return (  
        <div>
            <Home/>
            <Typography sx={{pl:15}}>Overview Page</Typography>
        </div>
    );
}
 
export default Overview;
//server/routes/routes.js
var express = require('express');
var router = express.Router();
const axios = require("axios");

router.get("/dashboard/overview", async(req, res) =>{
  try{
    const resultData = await axios.get(
      "http://localhost:5555/admin/monitor/service",
      {
        auth: {
          "username": "Administrator",
          "password": "manage"
        }
      },
    );
    res.send(resultData);
  } catch(err){
    console.log("error");
    res.send(err);
  }
})

router.get("/statistics", async(req, res) =>{
  try{
    const resultData = await axios.get(
      "http://localhost:5555/admin/monitor/service",
      {
        auth: {
          "username": "Administrator",
          "password": "manage"
        }
      },
    );
    res.send(resultData);
  } catch(err){
    console.log("error");
    res.send(err);
  }
})
 
router.get("/getProxy", async (req, res) => {
    try {
      const resultData = await axios.get(
          "http://localhost:5555/admin/proxy?expand=true",
          {
            auth: {
              "username": "Administrator",
              "password": "manage"
            }
          },
        );
      res.status(200).send(resultData.data);
    }
    catch (err) {
      console.log("error");
      console.log(err);
    }
})

router.post("/createProxy", async (req, res) => {

  console.log(req.body);
  
  try {
    const resultData = await axios.post(
      "http://localhost:5555/admin/proxy",
      req.body,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
    // console.log(resultData);
    res.send(resultData.data);
  }
  catch (err) {
      console.log("error");
    console.log(err);
  }
})

router.patch("/editProxy", async (req, res) => {
  try {
    const resultData = await axios.patch(
      "http://localhost:5555/admin/proxy/"+req.body.alias,
        req.body.formData,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
      
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
})

router.post("/deleteProxy", async (req, res) => {
  try {
    const resultData = await axios.delete(
      "http://localhost:5555/admin/proxy/"+req.body.proxyAlias,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
      
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
})



router.get("/getRemote", async (req, res) => {
  try {
    const resultData = await axios.get(
        "http://localhost:5555/admin/remoteserver?expand=true",
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
    res.status(200).send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
    res.send(err);
  }
})

router.post("/createRemote", async (req, res) => {
  
  try {
    const resultData = await axios.post(
      "http://localhost:5555/admin/remoteserver",
      req.body,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
    // console.log(resultData);
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
    res.send(err);
  }
})

router.patch("/editRemote", async (req, res) => {
  try {
    const resultData = await axios.patch(
      "http://localhost:5555/admin/remoteserver/"+req.body.alias,
        req.body.formData,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
      
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
})

router.post("/testRemote", async (req, res) => {
  
  try {
    const resultData = await axios.post(
      "http://localhost:5555/admin/remoteserver/"+req.body.alias,
      {
        "action": "test"
      },
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
    // console.log(resultData);
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
    res.send(err);
  }
})

router.post("/deleteRemote", async (req, res) => {
  try {
    const resultData = await axios.delete(
      "http://localhost:5555/admin/remoteserver/"+req.body.alias,
        {
          auth: {
            "username": "Administrator",
            "password": "manage"
          }
        },
      );
      
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
})


router.get("/license", async(req, res) => {
  try{
    const resultData = await axios.get(
      "http://localhost:5555/admin/license",
      {
        auth: {
          "username": "Administrator",
          "password": "manage"
        }
      },
    );
    res.send(resultData.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
})


module.exports = router;
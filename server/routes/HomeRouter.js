//server/routes/routes.js
var express = require('express');
var router = express.Router();
const axios = require("axios");

// router.get('/', async(req, res) => {
//     try {
//         const resultData = await axios.get(
//             "http://localhost:5555/admin/proxy/", {
//                 auth: {
//                   "username": "Administrator",
//                   "password": "manage"
//                 }
//               },
//             );
//         console.log(resultData);
//         return res.send(resultData.json(data));
//       }
//       catch (err) {
//         console.log(err);
//       }

// });

router.get("/", async (req, res) => {
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
        console.log(resultData);
      res.send(resultData.data);
    }
    catch (err) {
        console.log("error");
      console.log(err);
    }
  })


module.exports = router;
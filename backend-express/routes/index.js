var express = require('express');
var router = express.Router();
const {createToken} = require("../livekit.service");

router.get('/getToken', (req, res ) => {
  res.json({
    status : "Ok"
  })
})

module.exports = router;

const express = require('express');
const router = express.Router();


router.get(`/`, (req, res) => {
    res.end(`Hello World`)
})
// .get(`/test`, test())


module.exports = router;

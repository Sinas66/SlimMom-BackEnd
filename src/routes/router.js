const express = require('express');
const router = express.Router();


noSuchPageHandler = (req, res) => {
    res.end(`nooo`)

}
// router.use(`/api/v1`)
router.get(`/`, (req, res) => {
    res.end(`Hello World`)
})
    // .get(`/test`, test())
    .get(`*`, noSuchPageHandler)

module.exports = router;

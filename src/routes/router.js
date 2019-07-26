const express = require('express');
const router = express.Router();


noSuchPageHandler = (req, res) => {
    res.end(`nooo`)

}
router.get(`/`, (req, res) => {
    res.end(`Hello World`)
})
    .get(`*`, noSuchPageHandler)

module.exports = router;

const express = require('express');
const routerCalc = express.Router();
const ctrlCalc = require('../../controllers/calculator.controller');

routerCalc.put('/',  ctrlCalc.verifyOptions );

module.exports = routerCalc; 
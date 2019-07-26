const app = require(`./app/app`)
const express = require(`express`)
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path')
const errorHandler = require(`./utils/errorHandler`)
const favicon = require('serve-favicon');


const staticImagePath = path.join(__dirname, "../public")


const startServer = port => {

    app
        .use(cors())
        .use(express.urlencoded({ extended: false }))
        .use(express.json())
        .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
        .use(favicon(path.join(__dirname, '../public/images/favicon.ico')))
        .use('/public', express.static(staticImagePath))
        .use(router)
        .use(errorHandler);
    app.listen(port);
    console.log('Server was started at http://localhost:' + port);

}

module.exports = startServer;

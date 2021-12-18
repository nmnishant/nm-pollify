const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Routers
const apiRouter = require('./routers/apiRouter')
const viewRouter = require('./routers/viewRouter')

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Handling routes
app.use('/api/v1', apiRouter);
app.use('/', viewRouter);

module.exports = app;
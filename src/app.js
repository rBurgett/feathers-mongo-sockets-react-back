'use strict';

const fs = require('fs');
const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const homeHandler = require('./routes/home');
const aboutHandler = require('./routes/about');
const loginHandler = require('./routes/login');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

const description = 'feather-mongo-sockets-react-front description';
const image = '';

app.use(compress())
    .options('*', cors())
    .use(cors())
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .get('/', homeHandler({ title: 'Home', description, image }))
    .get('/about', aboutHandler({ title: 'About', description, image }))
    .get('/login', loginHandler({ title: 'Login', description, image }))
    .use('/', serveStatic(app.get('public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .configure(services)
    .configure(middleware);

module.exports = app;
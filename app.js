'use strict'

let express =      require('express');
let path =         require('path');
let logger =       require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser =   require('body-parser');

const app = express();

// Setup Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Logger
app.use(logger('dev'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => {
  console.log(`App listening on PORT : 3000`);
});

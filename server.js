const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const http = require('http');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

//use morgan to log requests
app.use(morgan('dev'))

const categories = require('./src/routes/categories.route');
const tags = require('./src/routes/tags.route');
const comments = require('./src/routes/comments.route');
const articles = require('./src/routes/articles.route');

app.use('/categories', categories);
app.use('/tags', tags);
app.use('/comments', comments);
app.use('/articles', articles);

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://admin:admin@cluster0-myfal.mongodb.net/ArticleJet?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;


app.use(cors());



let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 3000;

//create server

const server = http.createServer(app);

server.listen(port);



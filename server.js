const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const categories = require('./routes/categories.route');
const tags = require('./routes/tags.route');
const comments = require('./routes/comments.route');

app.use('/categories', categories);
app.use('/tags', tags);
app.use('/comments', comments);

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://admin:admin@cluster0-myfal.mongodb.net/ArticleJet?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);


mongoose.Promise = global.Promise;


app.use(cors());
//use morgan to log requests
app.use(morgan('dev'))


let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//create server
app.listen(3000, function () {
    console.log('listening on 3000')
});



// create server
/*
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Hello World Nodejs In ItGenius');
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Server is running on port 3001');
});
*/

// npm i express-fileupload

const express = require('express');
const bodyParser = require('body-parser'); // middleware to parse the body of the request
const fileUpload = require('express-fileupload'); // middleware to upload file
const jwt = require('jsonwebtoken'); // middleware to generate and verify jwt
const dotenv = require('dotenv'); // middleware to load environment variables
dotenv.config();

const app = express();

app.use(bodyParser.json()); // middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true })); // middleware to parse the body of the request
app.use(fileUpload()); // middleware to upload file
app.use('/uploads', express.static('uploads')); // middleware to serve static files

//
// controllers
//
const CustomerController = require('./controllers/CustomerController');
const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');

// 
// Book API
//
app.post('/api/book/create', BookController.create);
app.get('/api/book/list', BookController.list);
app.get('/api/book/findById/:id', BookController.findById);
app.put('/api/book/update/:id', BookController.update);
app.delete('/api/book/remove/:id', BookController.remove);
app.get('/api/book/count', BookController.count);
app.get('/api/book/search/:keyword', BookController.search);
app.get('/api/book/startsWith/:keyword', BookController.startsWith);
app.get('/api/book/endsWith/:keyword', BookController.endsWith);
app.get('/api/book/priceGt', BookController.priceGt);
app.get('/api/book/priceLt', BookController.priceLt);
app.get('/api/book/priceBetween', BookController.priceBetween);
app.get('/api/book/priceNot', BookController.priceNot);
app.get('/api/book/priceIn', BookController.priceIn);
app.get('/api/book/findMin', BookController.findMin);
app.get('/api/book/listBookAndAuthor', BookController.listBookAndAuthor);
app.get('/api/book/listAuthorAndBook', BookController.listAuthorAndBook);
app.get('/api/book/listPublisher', BookController.listPublisher);
app.get('/api/book/list2', BookController.list2);

//
// Customer API
//
app.get('/customers', CustomerController.list);
app.get('/customers/:id', CustomerController.findById);

//
// User API
//
app.post('/api/user/login', UserController.login);
app.get('/api/user/verifyToken', UserController.verifyToken);

app.get('/', (req, res) => {
    res.send('Hello World Nodejs In ItGenius');
});
app.get('/hello', (req, res) => {
    res.send('Hello by express api');
});
app.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name); // hello/kob
});
app.get('/hello/:name/:age', (req, res) => {
    const name = req.params.name;
    const age = req.params.age;

    res.send(`Hello ${name} ${age}`); // hello/kob/20
});
app.get('/hi', (req, res) => { // http://localhost:3001/hi?name=kob&age=20
    const name = req.query.name;
    const age = req.query.age;

    res.send(`Hi ${name} ${age}`);
});
app.post('/register/:token', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const token = req.params.token; // get token from url

    res.send(`Hello ${name} ${age} ${token}`);
});
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;

    res.send(`Update ${id} ${name} ${age}`);
});
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Delete ${id}`);
});
app.post('/upload', (req, res) => {
    const file = req.files.myImage;

    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }

    const extension = file.name.split('.').pop();
    const fileName = Date.now() + '.' + extension;

    file.mv('./uploads/' + fileName, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('File uploaded');
        }
    });
});
app.listen(3001, 'localhost', () => {
    console.log('Server is running on port 3001');
});



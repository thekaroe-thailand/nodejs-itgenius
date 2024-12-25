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
const app = express();

app.use(bodyParser.json()); // middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true })); // middleware to parse the body of the request
app.use(fileUpload()); // middleware to upload file
app.use('/uploads', express.static('uploads')); // middleware to serve static files

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



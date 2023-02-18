const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const dbConnect = require('./dbConnect')

const app = express();
const port = 3000;

app.use(express.static('templates'));
app.use(express.urlencoded({extended: true}));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false})


nunjucks.configure(path.join(__dirname, 'templates'), {
    autoescape: true,
    express: app
});

app.post('/insert', urlencodedParser, function(request, response) {
    const task = request.body;
    console.log(task);
    const db = dbConnect.getDbService();
    const result = db.insertNewTask(task);
    result.then(data => console.log(data))
})

app.get('/getAll', (request, response) => {
    const db = dbConnect.getDbService();
    const result = db.getAllData();
    result.then(data => response.render('index.html', {data: data})).catch(err => console.log(err));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
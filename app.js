var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.get('/topic', function(req, res){
  var topics = [
    'Javascript',
    'NodeJS',
    'Express'
  ];
  var output = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
  `
  res.send(output);
});

app.get('/template', function(req, res){
  res.render('temp', {time: Date(), title: 'Jade has been renamed to Pug'});
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/dynamic', function (req, res) {
  var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello, Dynamic!
        </body>
    </html>`;
    res.send(output);
});


app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/landscape1.jpg">');
});

app.get('/login', function (req, res) {
  res.send('Login please!');
});

app.listen(3000, function () {
  console.log('Connected on port 3000!');
});
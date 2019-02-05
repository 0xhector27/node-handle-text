var express = require('express')
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');

app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
            fs.readFile('data/'+id, 'utf8', function(err, data){
                if(err){
                    res.status(500).send('Internal Server Error');
                }
                res.render('main', {topics:files, title:id, text:data});
            })
        } else {
            res.render('main', {topics:files, title: "Welcome", text: "Hello, Javascript!"});
        }
    })
})

app.post('/topic', function(req, res){
    var title = req.body.title;
    var text = req.body.text;
    fs.writeFile('data/'+title, text, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.redirect("/topic/"+title);
    });
})
app.listen(3000, function(req, res){
    console.log('Connected on port 3000!');
})
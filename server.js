var express  = require('express'),
    mongoose = require('mongoose'),
    link     = require('./routes/link'),
    page     = require('./routes/page');

var app = express();

mongoose.connect('mongodb://localhost/url_shortener');

app.configure(function() {
    app.set('port', parseInt(process.env.PORT, 10) || 3000);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        pretty: true,
        layout: false
    });

    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.use(app.router);
});

// Default
app.get('/', page.index);
app.get('/dashboard', page.dashboard);
app.get('/about', page.about);

// Links
app.get('/links', link.getAll);
app.get('/:id', link.redirect);
app.get('/link/:id', link.get);
app.post('/link', link.create);


app.listen(app.get('port'), function(){
    console.log('Express server listening on port: ' + app.get('port'));
});

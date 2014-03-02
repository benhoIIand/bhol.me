var express = require('express'),
    link    = require('./routes/link'),
    index   = require('./routes/index');

var app = express();

app.configure(function() {
    app.set('port', parseInt(process.env.PORT, 10) || 3000);
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(app.router);
});

// Aliases
app.get('/links', link.getAll);
app.get('/:id', link.get);
app.post('/link', link.create);

// Default
app.get('/', index);


app.listen(app.get('port'), function(){
    console.log('Express server listening on port: ' + app.get('port'));
});

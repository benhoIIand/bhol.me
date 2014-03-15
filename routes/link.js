var Link = require('../models/link');

var generateId = function(len) {
    var text = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < (len || 8); i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

module.exports = {

    redirect: function(req, res) {
        Link.find({
            hash: req.params.id
        }, function(err, result) {
            if(err) console.log(err);

            if(result[0]) {
                result = result[0];
            } else {
                res.redirect('/');
                return false;
            }

            Link.update({
                _id: result._id
            }, {
                views: (result.views + 1)
            }, function(err) {
                if(err) console.log(err);
            });

            res.redirect(result.url);
        });
    },

    get: function(req, res) {
        Link.find({
            hash: req.params.id
        }, function(err, results) {
            if(err) console.log(err);

            res.json(results);
        });
    },

    getAll: function(req, res) {
        var q      = req.query,
            sort   = q.sort   ? q.sort.toLowerCase()   : 'created',
            order  = q.order  ? q.order.toLowerCase()  : '-1',
            fields = q.fields ? q.fields.toLowerCase() : '';

        order = order === 'asc' ? 1 : (order === 'desc' ? -1 : order);

        var sortObj = {};
        sortObj[sort] = order;

        var query = {};

        Link.find(query, fields, {
            sort: sortObj
        },
        function(err, results) {
            if(err) console.log(err);
            res.send(results);
        });
    },

    create: function(req, res) {
        try {
            if(req.body instanceof Array) {
                req.body.forEach(function(entry) {
                    entry.hash = generateId();

                    new Link(entry).save(function(err) {
                        if(err) console.log(err);

                        res.json('success');
                    });
                });
            } else {
                req.body.hash = generateId();

                new Link(req.body).save(function(err) {
                    if(err) console.log(err);

                    console.log('fajnwfnawjfjw');
                    res.json('success');
                });
            }
        } catch(e) {
            throw Error('Create link:', e);
        }
    },

    update: function(req, res) {
        var ids = req.params.id.split(',');
        
        Link.update({
            _id: {
                $in: ids
            }
        }, req.body, {}, function() {
            res.json('updated');
        });
    },

    delete: function(req, res) {
        var ids = req.params.id.split(',');
        
        Link.remove({
            _id: {
                $in: ids
            }
        }, function(err) {
            res.json('deleted');
        });
    }

};

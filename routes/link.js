var Link = require('../models/link');

module.exports = {

    get: function(req, res) {
        Link.find({
            hash: req.params.id
        }, function(err, results) {
            if(err) console.log(err);

            res.redirect(results[0].url);
        });
    },

    getAll: function(req, res) {
        var q      = req.query,
            sort   = q.sort   ? q.sort.toLowerCase()   : 'name',
            order  = q.order  ? q.order.toLowerCase()  : '1',
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
                    new Link(entry).save(function() {
                        res.json('success');
                    });
                });
            } else {
                new Link(req.body).save(function() {
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

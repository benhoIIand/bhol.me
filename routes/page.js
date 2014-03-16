var layout = '';

module.exports = {

    index: function(req, res) {
        res.render('pages/index.jade');
    },

    dashboard: function(req, res) {
        res.render('pages/dashboard.jade');
    },

    about: function(req, res) {
        res.render('pages/about.jade');
    }

};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/url_shortener');

var linkSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    }
});

linkSchema.index({ hash: 1, url: 1 }, { unique: true });

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;

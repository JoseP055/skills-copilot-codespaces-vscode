// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

// Connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Create Schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});
var Comment = mongoose.model('Comment', commentSchema);

// Set up routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'comment.html'));
});

router.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) return console.error(err);
        res.json(comments);
    });
});

router.post('/comments', function(req, res) {
    var newComment = new Comment(req.body);
    newComment.save(function(err, comment) {
        if (err) return console.error(err);
        res.json(comment);
    });
});

router.delete('/comments/:id', function(req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) return console.error(err);
        res.json(comment);
    });
});

module.exports = router;

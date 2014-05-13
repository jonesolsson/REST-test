var db = require('../models')

exports.index = function(req, res){
  db.Post.findAll({order: 'createdAt DESC'}).success(function(posts) {
    console.log(posts);
    res.json(posts);
  })
};

exports.getpost = function(req, res) {
  db.Post.find(req.params.id).success(function(post) {
    console.log(post);
    res.json(post);
  });
};

exports.create = function(req, res){
  db.Post.create(req.body).complete(function(err, post) {
    res.json(post);
  });
};

exports.update = function(req, res){
  db.Post.find(req.params.id).success(function(post) {
    post.updateAttributes(req.body).success(function(post) {
      res.json(post);
    })
  });
};

exports.destroy = function(req, res){
  db.Post.find(req.params.id).success(function(post) {
    post.destroy().success(function() {
      res.status(200);
      res.end()
    })
  });
};


var db = require('../models')

exports.index = function(req, res){
  db.Todo.findAll().success(function(todos) {
    console.log(todos);
    res.json(todos);
  })
};

exports.create = function(req, res){
  db.Todo.create(req.body).complete(function(err, todo) {
    res.json(todo);
  });
};

exports.update = function(req, res){
  db.Todo.find(req.params.id).success(function(todo) {
    todo.updateAttributes(req.body).success(function(todo) {
      res.json(todo);
    })
  });
};

exports.destroy = function(req, res){
  db.Todo.find(req.params.id).success(function(todo) {
    todo.destroy().success(function() {
      res.status(200);
      res.end()
    })
  });
};

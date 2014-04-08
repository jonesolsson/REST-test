module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    value: DataTypes.STRING,
    done: { type: DataTypes.BOOLEAN, defaultValue: false }
  },{
  timestamps: false
  })
  return Todo
}

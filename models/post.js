module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  },{
  timestamps: true
  })
  return Post
}

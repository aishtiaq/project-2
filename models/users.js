module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Users;
};

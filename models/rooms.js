module.exports = function(sequelize, DataTypes) {
    var Rooms = sequelize.define("Rooms", {
      room_name: DataTypes.STRING
    });
    return Rooms;
  };
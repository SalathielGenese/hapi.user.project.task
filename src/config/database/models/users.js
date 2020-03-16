'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    name: {
      allowNull: false,
      validate: { min: 1 },
      type: DataTypes.STRING
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};

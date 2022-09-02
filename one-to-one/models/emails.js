'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Emails.belongsTo(models.Users)
    }
  }
  Emails.init({
    email: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Emails',
  });
  return Emails;
};
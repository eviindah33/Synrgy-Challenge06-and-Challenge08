"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init(
    {
      name: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      size: DataTypes.STRING,
      picture: DataTypes.TEXT,
      description: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      transmition: DataTypes.STRING,
      year: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};

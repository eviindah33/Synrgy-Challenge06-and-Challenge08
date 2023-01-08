const { Car } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class CarRepository {
  static async create({ name, price, size, picture, description, capacity, transmition, year, available, createdBy }) {
    const createdCar = await Car.create({
      name,
      price,
      size,
      picture,
      description,
      capacity,
      transmition,
      year,
      available,
      createdBy,
      //   deletedBy,
      //   updatedBy,
      //   deletedAt,
    });

    return createdCar;
  }

  static async getByID({ id }) {
    const getCar = await Car.findOne({ where: { id } });
    return getCar;
  }

  static async getAll() {
    const getCar = await Car.findAll();
    return getCar;
  }

  static async getAllAvailable({ available }) {
    const getAllCar = await Car.findAll({ where: { available } });
    return getAllCar;
  }

  static async deleteByID({ id, deletedBy }) {
    const deleteCar = await Car.update(
      {
        deletedAt: new Date().getTime(),
        deletedBy,
      },
      { where: { id } }
    );
    return deleteCar;
  }

  static async updateByID({ name, price, size, picture, description, capacity, transmition, year, available, updatedBy }) {
    const updateCar = await Car.update(
      {
        name,
        price,
        size,
        picture,
        description,
        capacity,
        transmition,
        year,
        available,
        updatedBy,
      },
      { where: { id } }
    );
    return updateCar;
  }
}

module.exports = CarRepository;

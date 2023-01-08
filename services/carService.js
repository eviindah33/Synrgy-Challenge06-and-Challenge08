const carRepository = require("../repositories/carRepository");

class CarService {
  static async create({ name, price, size, picture, description, capacity, transmition, year, available, createdBy }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama mobil wajib diisi",
          data: null,
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga sewa wajib diisi",
          data: null,
        };
      }

      if (!size) {
        return {
          status: false,
          status_code: 400,
          message: "Ukuran mobil wajib diisi",
          data: null,
        };
      }

      if (!picture) {
        return {
          status: false,
          status_code: 400,
          message: "Gambar mobil wajib diisi",
          data: null,
        };
      }

      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "Deskripsi wajib diisi",
          data: null,
        };
      }

      if (!capacity) {
        return {
          status: false,
          status_code: 400,
          message: "Kapasitas wajib diisi",
          data: null,
        };
      }

      if (!transmition) {
        return {
          status: false,
          status_code: 400,
          message: "Transmisi wajib diisi",
          data: null,
        };
      }

      if (!year) {
        return {
          status: false,
          status_code: 400,
          message: "Tahun wajib diisi",
          data: null,
        };
      }

      const createdCar = await carRepository.create({ name, price, size, picture, description, capacity, transmition, year, available, createdBy });

      return {
        status: true,
        status_code: 201,
        message: "Car created successfully",
        data: createdCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async deleteByID({ id, deletedBy }) {
    try {
      const deletedCar = await carRepository.deleteByID({ id, deletedBy });
      return {
        status: true,
        status_code: 200,
        message: "Car deleted successfully",
        data: deletedCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async updateByID({ name, price, size, picture, description, capacity, transmition, year, available, updatedBy }) {
    try {
      const updatedCar = await carRepository.updateByID({ name, price, size, picture, description, capacity, transmition, year, available, updatedBy });
      return {
        status: true,
        status_code: 200,
        message: "Car updated successfully",
        data: updatedCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getAll() {
    try {
      const getCar = await carRepository.getAll();
      return {
        status: true,
        status_code: 200,
        message: "Get All Cars",
        data: getCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getAllAvailable({ available }) {
    try {
      const availableCar = await carRepository.getAllAvailable({ available });
      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: availableCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }

  static async getCarByID({ id, deletedBy }) {
    try {
      const getCar = await carRepository.getCarByID({ id, deletedBy });
      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: getCar,
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: null,
      };
    }
  }
}

module.exports = CarService;

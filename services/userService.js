const userRepository = require("../repositories/userRepository");

class UserService {
  static async getAll({ id }) {
    try {
      const getUser = await userRepository.getAll({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: getUser,
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

  static async deleteByID({ id }) {
    try {
      const getUser = await userRepository.getByID({ id });

      if (!getUser)
        return {
          status: false,
          status_code: 404,
          message: "User tidak ditemukan",
          data: {
            deleted_user: null,
          },
        };

      const deleteUser = await userRepository.deleteByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: {
          deleted_user: deleteUser,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          deleted_user: null,
        },
      };
    }
  }
}

module.exports = UserService;

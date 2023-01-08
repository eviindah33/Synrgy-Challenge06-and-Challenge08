const { User } = require("../models");

class userRepository {
  static async create({ name, email, password, role }) {
    const createUser = User.create({
      name,
      email,
      password,
      role,
    });
    return createUser;
  }

  static async deleteByID({ id }) {
    const deleteUser = await User.destroy({ where: { id } });
    return deleteUser;
  }

  static async getByID({ id }) {
    const getUserByID = await User.findOne({ where: { id } });
    return getUserByID;
  }

  static async getByEmail({ email }) {
    const getUserByEmail = await User.findOne({ where: { email } });
    return getUserByEmail;
  }

  static async getAll() {
    const getUserAll = await User.findAll();
    return getUserAll;
  }
}

module.exports = userRepository;

const usersRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT, ROLES } = require("../lib/const");
const SALT_ROUND = 10;

class AuthService {
  static async register({ name, role, email, password }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            name: null,
          },
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            password: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: {
            password: null,
          },
        };
      }
      if (!role) {
        return {
          status: false,
          status_code: 400,
          message: "Role wajib diisi",
          data: {
            role: null,
          },
        };
      }

      if (role === "superadmin" || role === "user") {
        const getUserByEmail = await usersRepository.getUserByEmail({ email });

        if (!getUserByEmail) {
          const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
          const createdUser = await usersRepository.create({
            name,
            role,
            email,
            password: hashedPassword,
          });
          if (role === "superadmin") {
            return {
              status: true,
              status_code: 201,
              message: "Berhasil ditambahkan sebagai Superadmin",
              data: {
                registered_user: createdUser,
              },
            };
          } else if (role === "user") {
            return {
              status: true,
              status_code: 201,
              message: "Berhasil ditambahkan sebagai User",
              data: {
                registered_user: createdUser,
              },
            };
          }
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Email sudah digunakan",
            data: {
              registered_user: null,
            },
          };
        }
      } else {
        return {
          status: false,
          status_code: 400,
          message: "admin hanya bisa ditambahkan oleh superadmin",
          data: {
            registered_user: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async registerAdmin({ name, role, email, password }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama wajib diisi",
          data: {
            name: null,
          },
        };
      }

      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            password: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: null,
        };
      }
      if (!role === ROLES.ADMIN) {
        return {
          status: false,
          status_code: 400,
          message: "Hanya role Admin yang bisa registrasi",
          data: {
            role: null,
          },
        };
      }
      const getUserByEmail = await usersRepository.getUserByEmail({ email });

      if (!getUserByEmail) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        const createdUser = await usersRepository.create({
          name,
          role,
          email,
          password: hashedPassword,
        });

        return {
          status: true,
          status_code: 201,
          message: "Admin berhasil ditambahkan",
          data: {
            registered_user: createdUser,
          },
        };
      } else {
        return {
          status: false,
          status_code: 400,
          message: "Email sudah digunakan",
          data: {
            registered_user: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async login({ email, password }) {
    try {
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Email wajib diisi",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Password wajib diisi",
          data: {
            password: null,
          },
        };
      }
      if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password minimal 8 karakter",
          data: null,
        };
      }

      const getUserByEmail = await usersRepository.getUserByEmail({ email });

      if (!getUserByEmail.password) {
        return {
          status: false,
          status_code: 400,
          message: "Email atau Password salah",
          data: null,
        };
      }
      if (!getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email belum terdaftar",
          data: {
            email: null,
          },
        };
      } else {
        const isPasswordMatch = await bcrypt.compare(password, getUserByEmail.password);

        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              id: getUserByEmail.id,
              email: getUserByEmail.email,
            },
            JWT.SECRET,
            {
              expiresIn: JWT.EXPIRED,
            }
          );

          return {
            status: true,
            status_code: 200,
            message: "User berhasil login",
            data: {
              token,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Password salah",
            data: null,
          };
        }
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}
module.exports = AuthService;

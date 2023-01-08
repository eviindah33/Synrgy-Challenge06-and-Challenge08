exports.JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRED: process.env.JWT_EXPIRED,
};

exports.ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
};

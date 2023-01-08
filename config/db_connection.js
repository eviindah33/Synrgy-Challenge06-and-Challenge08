const Pool = require("pg").Pool;

const connection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "HarusSukses33!",
  database: "syngry5",
  port: 5432,
});

module.exports = connection;

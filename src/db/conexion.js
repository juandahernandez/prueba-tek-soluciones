const { Sequelize } = require("sequelize");

const conexion = new Sequelize({
  host: "localhost",
  username: "postgres",
  password: "1088292856",
  port: 5432,
  database: "reto-2",
  dialect: "postgres",
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

module.exports = { conexion };

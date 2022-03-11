const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//JAWSDB_URL=//dk8exuyjtq9gc3ue:xahkk740q7bvqx9o@m7az7525jg6ygibs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/h1c0mc3hkmnpr3w9

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

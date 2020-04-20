require('dotenv').config(); // this is important!

const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "test"
const MYSQL_USER = process.env.MYSQL_USER || "test"
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "test"
const MYSQL_SERVER = process.env.MYSQL_SERVER || "localhost"

console.log(`sever: ${MYSQL_SERVER}`);

module.exports = {
  "development": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DATABASE,
    "host": MYSQL_SERVER,
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "test": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DATABASE,
    "host": MYSQL_SERVER,
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "production": {
    "username": MYSQL_USER,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DATABASE,
    "host": MYSQL_SERVER,
    "dialect": "mysql",
    "operatorsAliases": 0
  }
}

const mysql = require('mysql');
require('dotenv').config();

let client;

const getClient = () => {
  if (!client) {
    client = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
  return client;
};

exports.query = async (query, params = []) => {
  const client = getClient();
  return new Promise((resolve, reject) => {
    client.query(query, params, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

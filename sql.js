const mysql = require('mysql');
require('dotenv').config();

module.exports = {
  sql : ()=>{
    const con = mysql.createConnection(
      {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.db
      }
    )
    con.connect();

    return con;
  },
}
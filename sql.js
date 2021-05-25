const mysql = require('mysql');
require('dotenv').config();

const parseDbUrl = require("parse-database-url");

// const dbConfig = parseDbUrl(process.env.CLEARDB_DATABASE_URL);

const db_config =  {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db
}

const sql=()=>{
  /** Manual live configuration */
    // const con = mysql.createConnection(db_config);

    /** Manual local configuration */
    // const con = mysql.createConnection(
    //   {
    //     host: process.env.host_local,
    //     user: process.env.user_local,
    //     password: process.env.password_local,
    //     database: process.env.db_local
    //   }
    // )

    /** String live configuration */
    // const con = mysql.createConnection(dbConfig);
    const con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
    // con.getConnection(function(err, connection) {
    //   if (err) throw err;
    //   con = connection;
    // });

    return con
}

// console.log(dbConfig);
module.exports = { sql }
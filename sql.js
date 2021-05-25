const mysql = require('mysql');
require('dotenv').config();

module.exports = {
  sql : ()=>{
    /** Manual live configuration */
    // const con = mysql.createConnection(
    //   {
    //     host: process.env.host,
    //     user: process.env.user,
    //     password: process.env.password,
    //     database: process.env.db
    //   }
    // )

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
    const con = mysql.createConnection("mysql://baa35a2f5a2897:8f1a9020@us-cdbr-east-03.cleardb.com/heroku_c2bf43a6f947987?reconnect=true")
    // const con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
    con.connect();

    return con;
  },
}
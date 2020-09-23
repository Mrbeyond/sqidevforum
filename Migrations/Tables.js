"use strict";

/** The student migration */
const userTable = `CREATE TABLE IF NOT EXISTS students ( 
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(225) NOT NULL,
  lastName VARCHAR(225) NOT NULL,
  email VARCHAR(225) NOT NULL,
  course VARCHAR(225) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  gender VARCHAR(15) NOT NULL,
  password VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

module.exports = {
  userTable: userTable
  
};
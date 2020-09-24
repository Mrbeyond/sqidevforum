"use strict";

/** The student migration */
const userTable = `CREATE TABLE IF NOT EXISTS students ( 
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(225) NOT NULL,
  lastName VARCHAR(225) NOT NULL,
  email VARCHAR(225) NOT NULL UNIQUE,
  course VARCHAR(225) NOT NULL,
  phone VARCHAR(30) NOT NULL UNIQUE,
  gender VARCHAR(15) NOT NULL,
  profilePic VARCHAR(225),
  password VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const statusTable = ` CREATE TABLE IF NOT EXISTS status(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  student_id INT(11) NOT NULL,
  description TEXT(10000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFRENCES students(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const statusFileTable = ` CREATE TABLE IF NOT EXISTS status_files(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  status_id INT(11) NOT NULL,
  name VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (status_id) REFRENCES status(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const statusCommentTable = ` CREATE TABLE IF NOT EXISTS status(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  status_id INT(11) NOT NULL,
  student_id INT(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (status_id) REFRENCES status(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const languageTable = ` CREATE TABLE IF NOT EXISTS languages(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`;

const stackTable = ` CREATE TABLE IF NOT EXISTS stacks(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  language_id VARCHAR(225) NOT NULL,
  student_id INT(11) NOT NULL,
  current INT(4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFRENCES students(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const stackProgressTable = ` CREATE TABLE IF NOT EXISTS current_stacks(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  stack_id INT(11) NOT NULL,
  student_id INT(11) NOT NULL,
  progress TEXT(10000) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (stack_id) REFRENCES stacks(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const projectTable = ` CREATE TABLE IF NOT EXISTS projects(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  student_id INT(11) NOT NULL,
  repo  VARCHAR(225) NOT NULL,
  description TEXT(1000) NOT NULL,
  current INT(4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFRENCES students(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const projectProgressTable = ` CREATE TABLE IF NOT EXISTS current_projects(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  student_id INT(11) NOT NULL,
  project_id INT(11) NOT NULL,
  type INT(4) NOT NULL DEFAULT 0,
  message TEXT(10000) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFRENCES projects(id) 
  ON UPDATE CASCADE 
  ON DELETE CASCADE 
)`;

const projectCollaboratorTable = ` CREATE TABLE IF NOT EXISTS project_collaborators(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  student_id INT(11) NOT NULL,
  project_id INT(11) NOT NULL,
  collaborator_id INT(11) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const privateChatTable = ` CREATE TABLE IF NOT EXISTS private_chats(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sender_id INT(11) NOT NULL,
  receiver_id INT(11) NOT NULL,
  conversation_id VARCHAR(225) NOT NULL,
  type INT(4) NOT NULL DEFAULT 0,
  message TEXT(10000) NOT NULL,
  read INT(4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const generalChatTable = ` CREATE TABLE IF NOT EXISTS general_chats(
  id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sender_id INT(11) NOT NULL,
  type INT(4) NOT NULL DEFAULT 0,
  message TEXT(10000) NOT NULL,
  read INT(4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = {
  userTable: userTable,
  statusTable: statusTable,
  statusFileTable: statusFileTable,
  statusCommentTable: statusCommentTable,
  languageTable: languageTable,
  stackTable: stackTable,
  stackProgressTable: stackProgressTable,
  projectTable: projectTable,
  projectProgressTable: projectProgressTable,
  projectCollaboratorTable: projectCollaboratorTable,
  privateChatTable: privateChatTable,
  generalChatTable: generalChatTable,  
};
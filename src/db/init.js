const db = require("./index");

// Get all tables in database
const initializeDB = async () => {
  const tables = (
    await db.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND (table_type='BASE TABLE' OR table_type='VIEW');"
    )
  ).rows;

  const enum_types = (
    await db.query(
      "SELECT typname AS typename FROM pg_type WHERE typname = 'student_status_type' OR typname = 'gender_type';"
    )
  ).rows;

  const enumTypeNames = enum_types.map((e) => e.typename);
  const tableNames = tables.map((table) => table.table_name);

  // Create types
  if (enumTypeNames.indexOf("student_status_type") < 0) {
    const result = await db.query(
      "CREATE TYPE student_status_type AS ENUM ('rejected', 'updated', 'approved');"
    );
    console.log("student_status_type: ", result);
  }

  if (enumTypeNames.indexOf("gender_type") < 0) {
    const result = await db.query(
      "CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');"
    );
    console.log("gender_type: ", result);
  }

  // Create roles table
  if (tableNames.indexOf("roles") < 0) {
    const result = await db.query(
      "CREATE TABLE roles(role_id SERIAL PRIMARY KEY, role VARCHAR(50) NOT NULL UNIQUE);"
    );
    console.log("roles: ", result);
  }

  // Create departments table
  if (tableNames.indexOf("branches") < 0) {
    const result = await db.query(
      "CREATE TABLE branches(branch_id SERIAL PRIMARY KEY, branch VARCHAR(125) UNIQUE NOT NULL);"
    );
    console.log("branches: ", result);
  }

  // Create users table
  if (tableNames.indexOf("users") < 0) {
    const result = await db.query(
      "CREATE TABLE users(user_id BIGSERIAL PRIMARY KEY, role_id SERIAL NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(role_id) REFERENCES roles(role_id));"
    );
    console.log("users: ", result);
  }

  // Create staffs table
  if (tableNames.indexOf("staffs") < 0) {
    const result = await db.query(
      "CREATE TABLE staffs(staff_id BIGSERIAL PRIMARY KEY, branch_id SERIAL NOT NULL, employee_no VARCHAR(255) UNIQUE NOT NULL);"
    );
    console.log("staffs: ", result);
  }

  // Create batches table
  if (tableNames.indexOf("batches") < 0) {
    const result = await db.query(
      "CREATE TABLE batches(batch_id SERIAL PRIMARY KEY, batch VARCHAR(50) NOT NULL UNIQUE);"
    );
    console.log("batches: ", result);
  }

  // Create students table
  if (tableNames.indexOf("students") < 0) {
    const result = await db.query(
      "CREATE TABLE students(student_id BIGSERIAL PRIMARY KEY, register_no VARCHAR(25) NOT NULL UNIQUE, adm_no VARCHAR(25) NOT NULL UNIQUE, branch_id SERIAL NOT NULL, batch_id SERIAL NOT NULL, dob DATE NOT NULL, address VARCHAR(255) NOT NULL, phone CHAR(10) NOT NULL, gender GENDER_TYPE NOT NULL,twelth_school VARCHAR(255), twelth_percentage FLOAT(2) NOT NULL,tenth_school VARCHAR(255), tenth_percentage FLOAT(2) NOT NULL, status STUDENT_STATUS_TYPE NOT NULL DEFAULT 'updated', FOREIGN KEY(student_id) REFERENCES users(user_id), FOREIGN KEY(branch_id) REFERENCES branches(branch_id), FOREIGN KEY(batch_id) REFERENCES batches(batch_id));"
    );
    console.log("students: ", result);
  }

  // Create academics table
  if (tableNames.indexOf("academics") < 0) {
    const result = await db.query(
      "CREATE TABLE academics(student_id BIGSERIAL PRIMARY KEY, sgpa_s1 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s2 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s3 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s4 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s5 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s6 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s7 FLOAT(2) DEFAULT 0.0 NOT NULL, sgpa_s8 FLOAT(2) DEFAULT 0.0 NOT NULL,cgpa FLOAT(2) DEFAULT 0.0 NOT NULL, current_backlogs INT DEFAULT 0 NOT NULL, backlog_history INT DEFAULT 0 NOT NULL, skills TEXT,  FOREIGN KEY(student_id) REFERENCES students(student_id));"
    );
    console.log("academics: ", result);
  }

  if (tableNames.indexOf("student_academics") < 0) {
    const result = await db.query(
      "CREATE VIEW student_academics AS SELECT users.email, users.first_name, users.last_name, std.register_no, std.adm_no, std.dob, std.address, std.phone, std.gender, std.twelth_school, std.twelth_percentage, std.tenth_school, std.tenth_percentage, std.status, academics.*, branches.branch, batches.batch FROM students as std JOIN academics ON std.student_id = academics.student_id JOIN users on std.student_id = users.user_id JOIN batches on batches.batch_id = std.batch_id JOIN branches on branches.branch_id = std.branch_id;"
    );
    console.log("student_academics: ", result);
  }
};

initializeDB();

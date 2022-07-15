const db = require("./index");

// Get all tables in database
const initializeDB = async () => {
  const tables = (
    await db.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';"
    )
  ).rows;

  const tableNames = tables.map((table) => table.table_name);
  console.log(tableNames);

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
      "CREATE TABLE users(user_id BIGSERIAL PRIMARY KEY, role_id SERIAL NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(role_id) REFERENCES roles(role_id));"
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
      "CREATE TABLE students(student_id BIGSERIAL PRIMARY KEY, register_no VARCHAR(25) NOT NULL UNIQUE, adm_no VARCHAR(25) NOT NULL UNIQUE, roll_no INT NOT NULL UNIQUE, branch_id SERIAL NOT NULL, batch_id SERIAL NOT NULL, dob DATE NOT NULL, address VARCHAR(255) NOT NULL, mob_no CHAR(10) NOT NULL, gender CHAR(1) NOT NULL,twelth_school VARCHAR(255), tenth_school VARCHAR(255), staff_id BIGSERIAL NOT NULL, FOREIGN KEY(student_id) REFERENCES users(user_id), FOREIGN KEY(branch_id) REFERENCES branches(branch_id), FOREIGN KEY(batch_id) REFERENCES batches(batch_id), FOREIGN KEY(staff_id) REFERENCES staffs(staff_id));"
    );
    console.log("students: ", result);
  }

  // Create academics table
  if (tableNames.indexOf("academics") < 0) {
    const result = await db.query(
      "CREATE TABLE academics(student_id BIGSERIAL PRIMARY KEY, sgpa_s1 FLOAT(2) DEFAULT 0.0, sgpa_s2 FLOAT(2) DEFAULT 0.0, sgpa_s3 FLOAT(2) DEFAULT 0.0, sgpa_s4 FLOAT(2) DEFAULT 0.0, sgpa_s5 FLOAT(2) DEFAULT 0.0, sgpa_s6 FLOAT(2) DEFAULT 0.0, sgpa_s7 FLOAT(2) DEFAULT 0.0, sgpa_s8 FLOAT(2) DEFAULT 0.0,cgpa FLOAT(2) DEFAULT 0.0, curr_backlogs INT NOT NULL, backlog_history INT NOT NULL,twelth_percentage FLOAT(2) NOT NULL, tenth_percentage FLOAT(2) NOT NULL, FOREIGN KEY(student_id) REFERENCES students(student_id));"
    );
    console.log("academics: ", result);
  }
};

initializeDB();

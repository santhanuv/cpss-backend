const db = require("../../db");
const { findBatch } = require("../batch/batch.service");
const { findBranch } = require("../branch/branch.service");
const {
  createStudent,
  getStudentWithAcademicData,
  updateStudentService,
} = require("./student.service");
const {
  createAcademic,
  updateAcademicService,
} = require("../academic/academic.service");

const studentRegistrationHandler = async (req, res) => {
  try {
    const {
      regNO,
      admNO,
      dob,
      address,
      phone,
      gender,
      tenthSchool,
      tenthPercentage,
      twelthSchool,
      twelthPercentage,
      branch,
      batch,
      ...academic
    } = req.body;

    const studentID =
      req.user && req.user.role === "student" ? req.user.userID : null;

    if (
      !studentID ||
      !regNO ||
      !admNO ||
      !dob ||
      !address ||
      !phone ||
      !gender ||
      !twelthSchool ||
      !twelthPercentage ||
      !tenthSchool ||
      !tenthPercentage ||
      !branch ||
      !batch
    )
      return res.sendStatus(400);

    const batchDB = await findBatch({ batchName: batch });
    const branchDB = await findBranch({ branchName: branch });

    const student = {
      studentID,
      regNO,
      admNO,
      dob,
      address,
      phone,
      gender,
      tenthSchool,
      tenthPercentage,
      twelthSchool,
      twelthPercentage,
      branchID: branchDB.branch_id,
      batchID: batchDB.batch_id,
    };

    if (!branch || !batch) return res.sendStatus(400);

    // Transaction

    const client = await db.pool.connect();

    try {
      await client.query("BEGIN");

      await createStudent(student, client);
      await createAcademic({ ...academic, studentID }, client);

      await client.query("COMMIT");
      res.sendStatus(200);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    // End
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.msg });
  }
};

const studentUpdateHandler = async (req, res) => {
  try {
    const {
      register_no,
      adm_no,
      dob,
      address,
      phone,
      gender,
      tenth_school,
      tenth_percentage,
      twelth_school,
      twelth_percentage,
      branch,
      batch,
      ...academic
    } = req.body;

    const studentID =
      req.user && req.user.role === "student" ? req.user.userID : null;

    if (
      !studentID ||
      !register_no ||
      !adm_no ||
      !dob ||
      !address ||
      !phone ||
      !gender ||
      !twelth_school ||
      !twelth_percentage ||
      !tenth_school ||
      !tenth_percentage ||
      !branch ||
      !batch
    )
      return res.sendStatus(400);

    const batchDB = await findBatch({ batchName: batch });
    const branchDB = await findBranch({ branchName: branch });
    const status = "updated";

    const student = {
      studentID,
      register_no,
      adm_no,
      dob,
      address,
      phone,
      gender,
      tenth_school,
      tenth_percentage,
      twelth_school,
      twelth_percentage,
      branchID: branchDB.branch_id,
      batchID: batchDB.batch_id,
      status,
    };

    if (!branch || !batch) return res.sendStatus(400);

    // Transaction

    const client = await db.pool.connect();

    try {
      await client.query("BEGIN");

      await updateStudentService(student, client);
      await updateAcademicService({ ...academic, studentID }, client);

      await client.query("COMMIT");
      res.sendStatus(204);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    // End
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.msg });
  }
};

const getAllStudentDataHander = async (req, res) => {
  try {
    if (!req.user || !req.user.userID || !req.user.role === "student")
      return res.sendStatus(401);

    const studentData = await getStudentWithAcademicData(req.user.userID);
    res.status(200).json(studentData);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  studentRegistrationHandler,
  getAllStudentDataHander,
  studentUpdateHandler,
};

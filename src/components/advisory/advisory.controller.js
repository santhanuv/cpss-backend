const {
  createAdvisory,
  getAllAdvisoryStudents,
  getAdvisoryStudentID,
  getAllAdvisors,
} = require("./advisory.service");
const { findBatch } = require("../batch/batch.service");
const { findBranch } = require("../branch/branch.service");
const {
  getStudentWithAcademicData,
  updateStudentStatusService,
  removeStudent,
} = require("../student/student.service");
const { pool } = require("../../db");
const dbErrorHandler = require("../../utils/dbErrorHandler");

const createAdvisoryHandler = async (req, res) => {
  try {
    console.log("Advisory Register");
    const { branch, batch } = req.body;
    const advisorID = req.user?.userID;

    if (!branch || !batch) return res.sendStatus(400);
    if (!advisorID) return res.sendStatus(401);

    const batchDB = await findBatch({ batchName: batch });
    const branchDB = await findBranch({ branchName: branch });

    await createAdvisory({
      advisorID,
      batchID: batchDB.batch_id,
      branchID: branchDB.branch_id,
    });

    return res.status(201).json({ msg: "advisor created" });
  } catch (err) {
    console.error(err);
    err = dbErrorHandler(err);
    res.status(err.httpCode || 500).json({
      msg: err.msg,
      field: { key: err.field?.key, value: err.field?.value },
    });
  }
};

const getAllAdvisoryStudentsHandler = async (req, res) => {
  try {
    const advisorID = req.user?.userID;
    if (!advisorID) return res.sendStatus(401);

    const result = await getAllAdvisoryStudents(advisorID);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getStudentDataHandler = async (req, res) => {
  try {
    const admNO = req.params.admNO;
    const advisorID = req?.user.userID;

    if (!advisorID) return res.sendStatus(401);
    if (!admNO) return res.sendStatus(400);

    const student = await getAdvisoryStudentID(advisorID, admNO);
    if (!student || !student.student_id) return res.sendStatus(401);

    const studentData = await getStudentWithAcademicData(student.student_id);
    res.status(200).json(studentData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateStudentStatusHandler = async (req, res) => {
  try {
    const admNO = req.params.admNO;
    const advisorID = req?.user.userID;
    const { status } = req.body;

    if (!advisorID) return res.sendStatus(401);
    if (!admNO || !status) return res.sendStatus(400);

    const student = await getAdvisoryStudentID(advisorID, admNO);
    if (!student || !student.student_id) return res.sendStatus(401);

    await updateStudentStatusService(student.student_id, {
      status,
    });
    res.status(204).json({ msg: `${admNO} status updated` });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const removeStudentHandler = async (req, res) => {
  const client = await pool.connect();
  try {
    const studentID = req.params.studentID;

    if (!req.user || req.user.role !== "advisor") return res.sendStatus(401);
    if (!studentID) return res.sendStatus(400);

    await client.query("BEGIN");
    await removeStudent(studentID, client);
    await client.query("COMMIT");
    res.sendStatus(200);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

module.exports = {
  createAdvisoryHandler,
  getAllAdvisoryStudentsHandler,
  getStudentDataHandler,
  updateStudentStatusHandler,
  removeStudentHandler,
};

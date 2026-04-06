const express = require("express");
const router = express.Router();

const { markAttendance } = require("../controllers/attendanceController.js");

router.post("/:id/attendance", markAttendance);

module.exports = router;

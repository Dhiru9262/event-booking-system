const express = require("express");
const router = express.Router();

const { bookTicket } = require("../controllers/bookingController");

router.post("/", bookTicket);

module.exports = router;

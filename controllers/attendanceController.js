const db = require("../config/db");

const markAttendance = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Booking code required" });
    }

    // Check booking exists for this event
    const [booking] = await db.query(
      "SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?",
      [code, eventId],
    );

    if (booking.length === 0) {
      return res.status(404).json({ error: "Invalid booking code" });
    }

    // Prevent duplicate attendance
    const [alreadyMarked] = await db.query(
      "SELECT * FROM attendance WHERE booking_code = ?",
      [code],
    );

    if (alreadyMarked.length > 0) {
      return res.status(400).json({ error: "Attendance already marked" });
    }

    // Mark attendance
    await db.query("INSERT INTO attendance (booking_code) VALUES (?)", [code]);

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { markAttendance };

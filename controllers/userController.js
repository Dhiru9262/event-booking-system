const db = require("../config/db");

const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await db.query(
      `SELECT 
        b.id AS booking_id,
        b.booking_code,
        b.booking_date,
        e.title,
        e.date
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      WHERE b.user_id = ?`,
      [userId],
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserBookings };

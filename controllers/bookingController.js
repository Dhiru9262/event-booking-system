const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const bookTicket = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { user_id, event_id } = req.body;

    // Basic validation
    if (!user_id || !event_id) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Start transaction
    await connection.beginTransaction();

    // Lock the event row
    const [events] = await connection.query(
      "SELECT remaining_tickets FROM events WHERE id = ? FOR UPDATE",
      [event_id],
    );

    if (events.length === 0) {
      throw new Error("Event not found");
    }

    if (events[0].remaining_tickets <= 0) {
      throw new Error("No tickets available");
    }

    // Generate unique booking code
    const bookingCode = uuidv4();

    // Insert booking
    await connection.query(
      "INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)",
      [user_id, event_id, bookingCode],
    );

    // Update remaining tickets
    await connection.query(
      "UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?",
      [event_id],
    );

    // Commit transaction
    await connection.commit();

    res.json({
      message: "Booking successful",
      bookingCode,
    });
  } catch (error) {
    // Rollback if anything fails
    await connection.rollback();

    res.status(400).json({
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

module.exports = { bookTicket };

const db = require("../config/db");

const getEvents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM events WHERE date >= NOW()");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, total_capacity } = req.body;

    if (!title || !date || !total_capacity) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await db.query(
      "INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)",
      [title, description, date, total_capacity, total_capacity],
    );

    res.json({ message: "Event created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEvents, createEvent };
